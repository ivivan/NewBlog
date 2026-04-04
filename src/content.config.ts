import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      date: z.coerce.date().optional(),
      readTime: z.string().optional(),
      image: z.string().optional(),
      slug: z.string().optional(),
    })
    .passthrough(),
});

export const collections = { posts };
