import { fetchFile } from '@ffmpeg/util';
import { FileVideo, Upload } from 'lucide-react';
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';

import { api } from '@/lib/axios';
import { loadFFmpeg } from '@/lib/ffmpeg';
import { Button } from './ui/Button';
import { Label } from './ui/Label';
import { Separator } from './ui/Separator';
import { Textarea } from './ui/Textarea';

type VideoInputFormProps = {
  onVideoUploaded: (id: string) => void;
};

enum Status {
  WAITING = 'WAITING',
  CONVERTING = 'CONVERTING',
  UPLOADING = 'UPLOADING',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
}

const statusMessages: { [k in keyof typeof Status]: string } = {
  WAITING: 'Waiting...',
  CONVERTING: 'Converting...',
  UPLOADING: 'Uploading...',
  GENERATING: 'Generating...',
  SUCCESS: 'Success!',
};

export function VideoInputForm({ onVideoUploaded }: VideoInputFormProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [status, setStatus] = useState<`${Status}`>('WAITING');

  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }

    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;

    if (!files) {
      return;
    }

    const [selectedFile] = files;

    setVideoFile(selectedFile);
  }

  async function convertVideoToAudio(video: File) {
    console.log('Convert started');

    const ffmpeg = await loadFFmpeg();

    await ffmpeg.writeFile('input.mp4', await fetchFile(video));

    ffmpeg.on('progress', progress => {
      console.log(`Convert progress: ${Math.round(progress.progress * 100)}`);
    });

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ]);

    const data = await ffmpeg.readFile('output.mp3');

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' });

    const audioFile = new File([audioFileBlob], 'audio.mp3', { type: 'audio/mpeg' });

    console.log('Convert finished');

    return audioFile;
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const prompt = promptInputRef.current?.value;

    if (!videoFile) {
      return;
    }

    setStatus('CONVERTING');

    const audioFile = await convertVideoToAudio(videoFile);

    const data = new FormData();

    data.append('file', audioFile);

    setStatus('UPLOADING');

    const response = await api.post('/videos', data);

    const videoId = response.data.video.id;

    setStatus('GENERATING');

    await api.post(`/videos/${videoId}/transcription`, { prompt });

    setStatus('SUCCESS');

    onVideoUploaded(videoId);
  }

  return (
    <form onSubmit={handleUploadVideo} className="space-y-6">
      <label
        htmlFor="video"
        className="relative flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm text-muted-foreground transition-colors hover:bg-primary/10"
      >
        {previewURL && (
          <video
            src={`${previewURL}#t=1`}
            controls={false}
            className="pointer-events-none absolute inset-0"
          />
        )}

        {!previewURL && (
          <>
            <FileVideo className="h-6 w-6" />
            Select video
          </>
        )}
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        onChange={handleFileSelected}
        className="sr-only"
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription-prompt">Transcription prompt</Label>

        <Textarea
          disabled={status !== 'WAITING'}
          ref={promptInputRef}
          id="transcription-prompt"
          className="min-h-[5 rem] resize-none p-4 leading-relaxed"
          placeholder='List keywords mentioned in the video, separated by commas ","'
        />
      </div>

      <Button
        data-success={status === 'SUCCESS'}
        disabled={status !== 'WAITING'}
        type="submit"
        className="w-full data-[success=true]:bg-emerald-400"
      >
        {status === 'WAITING' ? (
          <>
            Upload video
            <Upload className="ml-2 h-4 w-4" />
          </>
        ) : (
          statusMessages[status]
        )}
      </Button>
    </form>
  );
}
