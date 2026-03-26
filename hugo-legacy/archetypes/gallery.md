---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
description: "Photo album showcasing {{ replace .Name "-" " " | lower }}"
layout: "gallery"
album:
  title: "{{ replace .Name "-" " " | title }}"
  description: "Description of this photo album"
  category: "community-events"  # Options: community-events, educational-programs, special-programs, mosque-facilities
  cover_image: "/img/placeholder.jpg"
  images:
    - src: "/img/example-photo-1.jpg"
      alt: "Description of photo 1"
      caption: "Caption for photo 1"
      category: "community-events"
    - src: "/img/example-photo-2.jpg"
      alt: "Description of photo 2"
      caption: "Caption for photo 2"
      category: "community-events"
    - src: "/img/example-photo-3.jpg"
      alt: "Description of photo 3"
      caption: "Caption for photo 3"
      category: "community-events"
tags: 
  - photography
  - community
categories:
  - gallery
featured: false
---

# {{ replace .Name "-" " " | title }}

Welcome to our photo album showcasing {{ replace .Name "-" " " | lower }}. This collection captures special moments from our community.

## About This Album

Add a description about this specific photo album here. You can include:

- Context about when these photos were taken
- Special significance of the events
- People or activities featured
- Any acknowledgments or credits

*Click on any image above to view it in full size and navigate through the collection.*

## How to Add More Photos

To add more photos to this album:

1. Upload your images to the `static/img/` directory
2. Add them to the `images` array in the frontmatter above
3. Make sure to include proper `alt` text for accessibility
4. Add descriptive captions to help visitors understand the photos

## Categories

Choose the appropriate category for your photos:
- **community-events**: Eid celebrations, community gatherings, special occasions
- **educational-programs**: Quran study, lectures, learning sessions  
- **special-programs**: Workshops, special events, community initiatives
- **mosque-facilities**: Mosque and community spaces
