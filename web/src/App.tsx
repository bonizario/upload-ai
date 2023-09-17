import { useCompletion } from 'ai/react';
import { Github, HelpCircle, Wand2 } from 'lucide-react';
import { useState } from 'react';

import { PromptSelect } from './components/PromptSelect';
import { VideoInputForm } from './components/VideoInputForm';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/Tooltip';

export function App() {
  const [temperature, setTemperature] = useState(0.5);

  const [videoId, setVideoId] = useState<string | null>(null);

  const { completion, input, isLoading, setInput, handleInputChange, handleSubmit } = useCompletion(
    {
      api: 'http://127.0.0.1:3333/ai/completion',
      body: {
        videoId,
        temperature,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return (
    <div className="flex h-screen cursor-default flex-col overflow-hidden selection:bg-secondary-foreground selection:text-secondary">
      <header className="flex select-none items-center justify-between border-b px-6 py-3">
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

      <main className="flex flex-1 gap-6 overflow-auto px-4 py-6">
        <div className="flex flex-1 flex-col gap-4 pl-2">
          <div className="grid flex-1 grid-rows-2 gap-4">
            <Textarea
              value={input}
              onChange={handleInputChange}
              className="resize-none p-4 leading-relaxed"
              placeholder="Add your prompt"
            />

            <Textarea
              readOnly
              value={completion}
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

        <aside className="w-[22.5rem] space-y-6 overflow-auto pr-2">
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Prompt</Label>

              <PromptSelect onPromptSelected={setInput} />
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
              <Label className="relative flex items-center gap-2">
                Temperature
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="absolute bottom-2 left-[-110px] flex h-24 w-[21.5rem] flex-col justify-center gap-2">
                      <span className="block text-xs italic">
                        <strong>Lower temperatures</strong> produce more focused, conservative, and
                        consistent responses.
                      </span>

                      <span className="block text-xs italic">
                        <strong>Higher temperatures</strong> generate more creative, diverse, and
                        unexpected outputs.
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>

              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={([value]) => setTemperature(value)}
                className="cursor-pointer"
              />

              <div className="space-y-2">
                <span className="block text-xs italic text-muted-foreground">
                  Higher temperature = more creativity!
                </span>
              </div>
            </div>

            <Separator />

            <Button disabled={isLoading || videoId === null} type="submit" className="w-full">
              Execute
              <Wand2 className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
