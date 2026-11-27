import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { researchCategories } from './config/content';

const categoryIds = researchCategories.map((c) => c.id) as [string, ...string[]];

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    order: z.number().default(0),
    date: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    // One of researchCategories' ids (src/config/content.ts); a typo fails the build.
    category: z.enum(categoryIds),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, research };
