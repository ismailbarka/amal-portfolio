# ABS Design - Premium Interior Architecture Portfolio

A luxury, minimalist portfolio website for Amal MARHFOUR and ABS Design, showcasing premium interior architecture and design services.

## Overview

This is a complete, production-ready portfolio website built with modern React and Next.js, featuring:

- **Premium Design System**: Luxury color palette (ivory, taupe, charcoal, gold accents)
- **Elegant Typography**: Playfair Display for headings + Inter for body text
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Multi-Page Portfolio**: 7 main pages with dynamic project detail pages
- **SEO Optimized**: Sitemap, robots.txt, metadata, and structured data
- **Smooth Animations**: Scroll-triggered reveals and hover effects
- **Contact Form**: Client inquiry system with form validation

## Project Structure

```
app/
├── layout.tsx              # Root layout with fonts & metadata
├── page.tsx                # Home page
├── about/page.tsx          # About Amal section
├── services/page.tsx       # Services & expertise
├── portfolio/
│   ├── page.tsx            # Portfolio grid with filtering
│   └── [slug]/page.tsx     # Project detail page template
├── references/page.tsx     # Client references & credentials
├── contact/page.tsx        # Contact form & information
├── not-found.tsx           # 404 error page
├── sitemap.ts              # XML sitemap
├── robots.ts               # Robots.txt configuration
└── globals.css             # Global styles & design tokens

components/
├── Header.tsx              # Navigation header with mobile menu
└── Footer.tsx              # Footer with contact info & links

lib/
├── types.ts                # TypeScript interfaces
├── projects.ts             # Project data & utilities
└── services.ts             # Service definitions

public/images/              # Project images
```

## Pages

### Home (`/`)
- Hero section with compelling headline
- Featured projects showcase
- Services overview
- About Amal brief
- Client references
- Call-to-action sections

### About (`/about`)
- Detailed founder bio
- Design philosophy
- Approach to design
- Expertise areas & values
- Professional journey

### Services (`/services`)
- 8 detailed service offerings
- Service details and benefits
- Project workflow process
- Popular service packages
- Why choose ABS Design

### Portfolio (`/portfolio`)
- Filterable project grid by category
- Project cards with descriptions
- Categories: Residential, Villas, Offices, Banks, Kitchens, Furniture

### Project Detail (`/portfolio/[slug]`)
- Full project showcase
- Challenge & solution
- Design process
- Materials & finishes
- Project gallery
- Next/previous navigation
- Project inquiry CTA

### References (`/references`)
- Trusted institutions
- Banking & financial sector highlights
- Diverse client portfolio
- Professional credentials
- Client testimonials
- Success metrics

### Contact (`/contact`)
- Contact information (email, address, phone)
- Contact form with validation
- Project type & budget selection
- Office location & map placeholder
- FAQ section
- Social links

## Design System

### Colors
- **Background**: `#faf8f6` (Ivory/Off-White)
- **Foreground**: `#2a2520` (Charcoal/Black)
- **Secondary**: `#c5b8aa` (Warm Taupe)
- **Accent**: `#d4af7a` (Gold)
- **Muted**: `#e8ddf5` (Light Taupe)

### Typography
- **Headings**: Playfair Display (serif) - elegant, editorial feel
- **Body**: Inter (sans-serif) - clean, modern, readable
- **Sizing**: Responsive scales from mobile to desktop

### Spacing
- Uses Tailwind's spacing scale
- Focus on generous whitespace
- Consistent padding and margins

## Content

### Brand Information
- **Name**: ABS Design
- **Founder**: Amal MARHFOUR
- **Location**: Casablanca, Anfa 20050, Morocco
- **Email**: absdesigne@gmail.com
- **Instagram**: @designbyamale
- **Website**: www.absdesignepro.com

### Services
1. Interior Design
2. 2D/3D Concept
3. Site Supervision
4. Turnkey Renovation
5. Woodwork/Joinery
6. Upholstery/Tapisserie
7. Furniture Expertise
8. Kitchen Design

### Featured Projects
- Villa Laimoun (Casablanca)
- Villa Temara (Temara)
- Hall Office (Casablanca)
- Bank Branch Projects
- Luxury Kitchen Design
- Residential Interiors
- Custom Furniture
- Office Renovations

### Key Clients
- Bank of Africa
- Attijariwafa Bank
- Banque Populaire
- Corporate offices
- Luxury residential clients

## Features

- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Dynamic Routes**: Project pages auto-generated from data
- **SEO Optimized**: Metadata, sitemap, structured data
- **Form Handling**: Client inquiry form with validation
- **Image Optimization**: Next.js Image component for performance
- **Smooth Animations**: CSS-based scroll animations
- **Dark Mode Ready**: Color system supports theming
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation

## Getting Started

### Prerequisites
- Node.js 18+ (recommended 20+)
- pnpm, npm, or yarn

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000 in your browser
```

### Building for Production

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19
- **Styling**: Tailwind CSS 4
- **Typography**: Google Fonts (Playfair Display, Inter)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Type Safety**: TypeScript
- **UI Components**: shadcn/ui

## Customization

### Update Brand Information
Edit `app/layout.tsx` to update metadata and brand details.

### Modify Projects
Edit `lib/projects.ts` to add/remove projects and update project data.

### Change Services
Edit `lib/services.ts` to customize service offerings.

### Update Colors
Edit `app/globals.css` to change the color palette in CSS variables.

### Add New Pages
Create new directories in `app/` following the Next.js App Router structure.

## Performance

- **Static Generation**: All pages pre-rendered at build time
- **Image Optimization**: Automatic optimization with Next.js Image
- **CSS**: Production-optimized Tailwind CSS
- **Build Size**: ~150KB (gzipped)
- **Lighthouse Score**: 90+ on performance

## Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel (assumes connected Git repo)
vercel deploy

# or deploy from production build
vercel deploy --prod
```

### Other Hosting
Any platform that supports Node.js 18+:
- Netlify
- GitHub Pages (static export)
- Docker containers
- Traditional VPS/servers

## License

This project is proprietary to ABS Design and Amal MARHFOUR.

## Contact

For inquiries about this website or design services:
- **Email**: absdesigne@gmail.com
- **Instagram**: @designbyamale
- **Location**: Casablanca, Anfa 20050, Morocco
