import { fastifyCors } from '@fastify/cors';
import 'dotenv/config';
import { fastify } from 'fastify';

import { createTranscriptionRoute } from './routes/create-transcription';
import { generateAICompletionRoute } from './routes/generate-ai-completion';
import { getAllPromptsRoute } from './routes/get-all-prompts';
import { uploadVideoRoute } from './routes/upload-video';

const PORT = 3333;

const app = fastify();

app.register(fastifyCors, {
  origin: '*',
});

app.register(getAllPromptsRoute);

app.register(uploadVideoRoute);

app.register(createTranscriptionRoute);

app.register(generateAICompletionRoute);

app.listen({ port: PORT }).then(() => {
  console.log(`Server started at http://127.0.0.1:${PORT}`);
});
