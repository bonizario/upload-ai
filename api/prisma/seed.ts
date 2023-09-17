import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.prompt.deleteMany();

  await prisma.prompt.create({
    data: {
      title: 'YouTube Title',
      template: `Your role is to generate three titles for a YouTube video.

Below, you will receive a transcription of this video. Please use this transcription to create the titles.

You will also receive a list of titles below, use this list as a reference for the titles to be generated.

The titles should have a maximum of 60 characters each.

The titles should be attention-grabbing and enticing to maximize clicks.

Return ONLY the three titles in a list format as shown in the example below:
'''

- Title 1
- Title 2
- Title 3
'''
Transcription:
'''
{transcription}
'''`.trim(),
    },
  });

  await prisma.prompt.create({
    data: {
      title: 'YouTube Description',
      template:
        `Your role is to generate a concise description for a YouTube video.

Below, you will receive a transcription of this video. Please use this transcription to create the description.

The description should be in the first person and contain the video's key points, with a maximum of 80 words.

Use compelling words to capture the reader's attention.

Furthermore, at the end of the description, include a list of 3 to 10 lowercase hashtags containing video keywords.

The format for the response should be as follows:
'''
Description.

#hashtag1 #hashtag2 #hashtag3 ...
'''

Transcription:
'''
{transcription}
'''`.trim(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
