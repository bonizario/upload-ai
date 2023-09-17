import { fastify } from 'fastify';

const PORT = 3333;

const app = fastify();

app.get('/', (request, response) => {
  return response.send({ hello: 'world' });
});

app.listen({ port: PORT }).then(() => {
  console.log(`Server started at http://localhost:${PORT}`);
});
