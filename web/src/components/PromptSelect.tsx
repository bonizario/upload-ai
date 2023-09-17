import { useEffect, useState } from 'react';

import { api } from '@/lib/axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';

type Prompt = {
  id: string;
  template: string;
  title: string;
};

type PromptSelectProps = {
  onPromptSelected: (template: string) => void;
};

export function PromptSelect({ onPromptSelected }: PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);

  useEffect(() => {
    (async function getPrompts() {
      const { data } = await api.get<Prompt[]>('/prompts');

      setPrompts(data);
    })();
  }, []);

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId);

    if (!selectedPrompt) {
      return;
    }

    onPromptSelected(selectedPrompt.template);
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Select a prompt" />
      </SelectTrigger>

      <SelectContent>
        {prompts?.map(prompt => (
          <SelectItem key={prompt.id} value={prompt.id}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
