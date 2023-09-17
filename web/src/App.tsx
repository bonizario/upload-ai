import { FileVideo, Github, Upload, Wand2 } from 'lucide-react';

import { Button } from './components/ui/Button';
import { Label } from './components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/Select';
import { Separator } from './components/ui/Separator';
import { Slider } from './components/ui/Slider';
import { Textarea } from './components/ui/Textarea';

export function App() {
  return (
    <div className="flex h-screen cursor-default flex-col overflow-hidden selection:bg-secondary-foreground selection:text-secondary">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-3">
          <a
            target="_blank"
            href="https://github.com/bonizario"
            className="group text-sm text-muted-foreground"
            rel="noreferrer"
          >
            Made with ❤ by <strong className="font-semibold text-primary">bonizario</strong>
            <span className="block h-[0.0625rem] max-w-0 bg-primary transition-all duration-500 group-hover:max-w-full" />
          </a>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </header>

      <main className="flex flex-1 gap-6 overflow-auto p-6">
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid flex-1 grid-rows-2 gap-4">
            <Textarea className="resize-none p-4 leading-relaxed" placeholder="Add your prompt" />

            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Output generated by AI"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Don&apos;t forget, you have the option to incorporate the transcript content of the
            chosen video by using a{' '}
            <strong className="text-primary">&#123;transcription&#125;</strong> variable in your
            prompt.
          </p>
        </div>

        <aside className="w-[22.5rem] space-y-6 overflow-auto pr-4">
          <form className="space-y-6">
            <label
              htmlFor="video"
              className="flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm text-muted-foreground transition-colors hover:bg-primary/10"
            >
              <FileVideo className="h-6 w-6" />
              Select video
            </label>

            <input type="file" id="video" accept="video/mp4" className="sr-only" />

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="transcription-prompt">Transcription prompt</Label>

              <Textarea
                id="transcription-prompt"
                className="min-h-[5 rem] resize-none p-4 leading-relaxed"
                placeholder='List keywords mentioned in the video, separated by commas ","'
              />
            </div>

            <Button type="submit" className="w-full">
              Upload video
              <Upload className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <Separator />

          <form className="space-y-6">
            <div className="space-y-2">
              <Label>Prompt</Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a prompt" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="title">Youtube video title</SelectItem>
                  <SelectItem value="description">Youtube video description</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Model</Label>

              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <span className="block text-xs italic text-muted-foreground">
                More options coming soon!
              </span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Temperature</Label>

              <Slider min={0} max={1} step={0.1} defaultValue={[0.5]} className="cursor-pointer" />

              <div className="space-y-2">
                <span className="block text-xs italic text-muted-foreground">
                  Higher temperature = more creativity!
                </span>
                {/* <span className="block text-xs italic text-muted-foreground">
                  Lower temperatures produce more focused, conservative, and consistent responses.
                </span>

                <span className="block text-xs italic text-muted-foreground">
                  Higher temperatures generate more creative, diverse, and unexpected outputs.
                </span> */}
              </div>
            </div>

            <Separator />

            <Button type="submit" className="w-full">
              Execute
              <Wand2 className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
