import { fastifyMultipart } from '@fastify/multipart';
import { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

import { prisma } from '../lib/prisma';

const MAX_FILE_SIZE = 1_048_576 * 25;

const pump = promisify(pipeline);

export async function uploadVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
  });

  app.post('/videos', async (request, reply) => {
    const data = await request.file();

    if (!data) {
      return reply.status(400).send({ error: 'Missing file input' });
    }

    const fileExtension = path.extname(data.filename);

    if (fileExtension !== '.mp3') {
      return reply
        .status(400)
        .send({ error: 'Invalid input type, please upload a MP3' });
    }

    const fileBaseName = path.basename(data.filename, fileExtension);

    const fileUploadName = `${fileBaseName}_${randomUUID()}${fileExtension}`;

    const uploadDestination = path.resolve(
      __dirname,
      '..',
      '..',
      'uploads',
      fileUploadName,
    );

    await pump(data.file, fs.createWriteStream(uploadDestination));

    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: uploadDestination,
      },
    });

    return reply.status(201).send({ video });
  });
}
