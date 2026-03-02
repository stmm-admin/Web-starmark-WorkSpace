# 🏗 Project Overview: Bathroom Product Catalog Website

## 1. Project Vision

Build a premium corporate website for a sanitaryware brand (similar concept to Duravit style), focused on:

- Product catalog display
- Brand positioning
- SEO optimization
- Future scalability (E-commerce / Dealer / B2B / ERP integration)

This is NOT an ecommerce website initially.
Phase 1 focuses on product catalog and brand presentation.

---

## 2. Technology Stack

### Frontend
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Animation: Framer Motion (optional, phase 2)
- SEO: Dynamic Metadata API
- Image Optimization: Next.js Image

### Backend (Headless CMS)
- CMS: Strapi
- Database: PostgreSQL
- API Type: REST
- Auth: Strapi Admin Panel only (no public auth in phase 1)

### Infrastructure
- Dockerized services
- Nginx (reverse proxy, production)
- SSL (Let's Encrypt)
- Hosting:
  - Frontend: Vercel OR VPS
  - CMS: VPS (Docker)

---

## 3. System Architecture

[ Next.js Frontend ]
        |
        | REST API
        v
[ Strapi CMS ]
        |
        v
[ PostgreSQL ]

Assets:
- Product Images
- PDF Downloads
- Stored via CMS Upload Provider

---

## 4. Core Features (Phase 1)

### Public Website

- Homepage
- Category Page
- Product Listing
- Product Detail Page
- SEO Friendly URLs
- Multi-language Ready (EN / TH structure prepared)
- Download PDF per product

### CMS Capabilities

- Manage Categories
- Manage Collections
- Manage Products
- Upload images
- Upload specification PDF
- Basic SEO fields (title, description)

---

## 5. URL Structure

/products
/products/[category]
/product/[slug]
/inspiration/[slug]

All slugs:
- lowercase
- dash-separated
- SEO friendly

---

## 6. Data Model

### Category
- name
- slug
- description
- cover_image

### Collection
- name
- slug
- hero_image
- description

### Product
- name
- slug
- short_description
- full_description
- category (relation)
- collection (relation)
- gallery (media)
- specifications (JSON field)
- downloads (media)
- seo_title
- seo_description

---

## 7. Development Rules

- Use Server Components by default
- Keep API logic inside /lib/api.ts
- Do NOT mix UI and API logic
- Use TypeScript interfaces for all data
- Avoid unnecessary client components
- Optimize images
- Follow clean folder structure

---

## 8. Future Scalability (Phase 2+)

System must support future expansion:

- Ecommerce (cart / checkout)
- Dealer locator
- Architect login
- B2B quotation request
- AI product advisor
- ERP integration (e.g., Odoo)
- Multi-language full implementation
- CDN integration
- Caching layer

Architecture must remain modular.

---

## 9. Non-Goals (Phase 1)

- No payment gateway
- No user login
- No complex workflow
- No inventory sync

---

## 10. Performance Targets

- Lighthouse > 90
- Fast Time To First Byte
- Optimized images
- Static generation where possible
- ISR for product pages

---

## 11. Security Principles

- Hide CMS from public access
- Admin IP restriction
- Secure environment variables
- Daily database backup
- SSL enforced

---

## 12. Design Direction

Style: Premium / Minimal / European-inspired

Focus:
- Large imagery
- Generous whitespace
- Clean typography
- Smooth scrolling
- Structured layout grid

---

## 13. Long-Term Vision

This project should evolve into:

A Digital Platform for the brand:
- Product ecosystem
- B2B portal
- Dealer system
- AI-powered recommendation
- ERP-connected digital catalog

The system must be scalable, maintainable, and future-proof.