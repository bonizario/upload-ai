import { fastify } from 'fastify';

import { getAllPromptsRoute } from './routes/get-all-prompts';
import { uploadVideoRoute } from './routes/upload-video';

const PORT = 3333;

const app = fastify();

app.register(getAllPromptsRoute);

app.register(uploadVideoRoute);

app.listen({ port: PORT }).then(() => {
  console.log(`Server started at http://127.0.0.1:${PORT}`);
});
