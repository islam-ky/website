import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ─── Shared helpers ──────────────────────────────── */
const imageField = z.string().optional();
const dateField = z.coerce.date().optional();

/* ─── Announcements ───────────────────────────────── */
const announcements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/announcements' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    urgent: z.boolean().default(false),
    expiryDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
  }),
});

/* ─── About Us ────────────────────────────────────── */
const aboutUs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about-us' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: dateField,
    draft: z.boolean().default(false),
    image: imageField,
  }),
});

/* ─── Services & Facilities ───────────────────────── */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services-and-facilities' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: dateField,
    draft: z.boolean().default(false),
    image: imageField,
  }),
});

/* ─── Islam in Cayman ─────────────────────────────── */
const islamInCayman = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/islam-in-cayman' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: dateField,
    draft: z.boolean().default(false),
    image: imageField,
    author: z.string().optional(),
  }),
});

/* ─── Events ──────────────────────────────────────── */
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    eventDate: z.coerce.date(),
    eventTime: z.string(),
    location: z.string(),
    image: imageField,
  }),
});

/* ─── News ────────────────────────────────────────── */
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    image: imageField,
  }),
});

/* ─── Gallery ─────────────────────────────────────── */
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: dateField,
    draft: z.boolean().default(false),
    layout: z.string().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    // Gallery index page data
    gallery: z.object({
      title: z.string(),
      description: z.string().optional(),
      categories: z.array(z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        images: z.array(z.object({
          src: z.string(),
          alt: z.string().optional(),
          caption: z.string().optional(),
          category: z.string().optional(),
        })).default([]),
      })).default([]),
    }).optional(),
    // Album page data
    album: z.object({
      title: z.string(),
      description: z.string().optional(),
      cover_image: z.string().optional(),
      images: z.array(z.object({
        src: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
      })).default([]),
    }).optional(),
  }),
});

/* ─── Pages (simple CMS pages) ────────────────────── */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: dateField,
    draft: z.boolean().default(false),
    featured_image: z.string().optional(),
    images: z.array(z.string()).default([]),
    menu: z.object({
      main: z.object({
        name: z.string(),
        weight: z.number(),
        identifier: z.string().optional(),
      }),
    }).optional(),
  }),
});

/* ─── Export ───────────────────────────────────────── */
export const collections = {
  announcements,
  'about-us': aboutUs,
  'services-and-facilities': services,
  'islam-in-cayman': islamInCayman,
  events,
  news,
  gallery,
  pages,
};
