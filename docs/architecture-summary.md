# Architecture summary

**Last updated:** 2026-04-08  
**Stack:** Next.js 16 (App Router), React 19, Tailwind 4, Prisma 7 (SQLite + `@prisma/adapter-better-sqlite3`), Zod (`prisma-zod-generator`).

## Executive overview

The app is a storefront with a **service → Prisma → DTO parse** pipeline for **products** and **categories**. Public product flows read real database data. **Authentication, middleware, and most HTTP APIs are missing.** Admin and several marketing surfaces use **mock or placeholder data**. **Cart and order services are not implemented** (orders have Prisma models only; there is **no cart model** in the current schema).

**Production readiness (qualitative):** strong for catalog **service/DTO patterns**; **not** production-ready for security, checkout, or fully wired admin.

## Logical project map

| Area | Role |
|------|------|
| `app/` | Routes: public (`/`, `/products`, `/products/[prodId]`, `/categories`, `/cart`, `/about`), admin (`/admin/*`), API `app/api/v1/route.ts` |
| `components/` | Header, hero, home sections, product grid/cards, product detail pieces, admin aside |
| `services/products/` | `create`, `fetch`, `update`, `delete` |
| `services/categpries/` | Same for categories (**folder name typo:** `categpries`) |
| `dto/product/`, `dto/categories/` | Zod DTOs + `schemas.ts` |
| `types/products.ts`, `types/categories.ts` | Types inferred from DTOs |
| `errors/` | `AppError`, `ValidationError`, `DatabaseError`, `ProductNotFoundError`, `CategoryNotFoundError` |
| `utils/` | `handle-service.ts`, `api-response.ts`, `build-discount.ts`, etc. |
| `lib/prisma.ts` | `PrismaClient` + SQLite adapter |
| `prisma/` | `schema.prisma`, `seed.ts`, generated client + Zod |
| `shared/` | `placeholders.ts`, `product-categories.ts` (static/demo) |

## Implemented (verified)

### Data layer (Prisma)

- **User** — email, name, password (no relations to orders in schema).
- **Products** — JSON fields (`imgs`, `inventory`, `shipping`, `metadata`, `tags`), `ProductStatus`, category relation, `OrderItem[]`.
- **Categories** — `CategoryStatus`, metadata, products relation.
- **Orders** / **OrderItem** — enums, line items; **no `User` FK on orders** (contact-style fields only).
- **AppData**, **Analytics** — present; analytics may be incomplete in schema.

**Enums in schema (source of truth):** `ProductStatus`: DRAFT, ACTIVE, OUT_OF_STOCK. `CategoryStatus`: ACTIVE, INACTIVE.

### DTOs and services

- Product and category **input/output** DTOs with Zod; multiple admin/public views.
- Full **CRUD services** for products and categories following validate → query → output parse → error handling.

### UI wired to real data

- Home **Featured** — `fetchPublicProductsService({ max: 4 })`.
- **`/products`** — `fetchPublicProductsService()`.
- **`/products/[prodId]`** — public product fetch services.

### HTTP API

- **`GET` / `POST`** on `app/api/v1/route.ts` only.
- `GET` uses `fetchPublicProductsService({ max: 1 })` (sample listing).
- `POST` validates with `CreateProductDto` and calls `createProductService` (**no authentication**).

## Cross-references

- [Data flow and diagrams](./data-flow-and-diagrams.md)
- [Blockers, gaps, risks, and priorities](./blockers-gaps-and-risks.md)
