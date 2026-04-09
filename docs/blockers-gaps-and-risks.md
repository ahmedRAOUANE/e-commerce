# Blockers, gaps, risks, and priorities

**Last updated:** 2026-04-08

## Critical blockers

| Item | Impact |
|------|--------|
| **No authentication** | Anyone who can reach mutating APIs could create data; admin is not protected. |
| **No middleware** | No route protection at the edge. |
| **Minimal API surface** | Only `app/api/v1/route.ts`; admin UI not backed by a full REST/RPC layer. |

## Incomplete or placeholder

| Area | Detail |
|------|--------|
| **Admin CRUD UI** | Products, categories, orders, customers pages use **mock data**; new product form is local state, not wired to `createProductService` / API. |
| **Public categories** | Home categories and `/categories` use **`@/shared/placeholders`**, not `getPublicCategoriesService`. |
| **Dynamic category URLs** | Links to `/categories/[id]` but **no** `app/categories/[id]` route → 404. |
| **Cart** | `app/cart/page.tsx` is a stub. **No cart model** in current `schema.prisma`. |
| **Orders (application)** | Prisma models exist; **no order services or APIs**. |
| **Contact** | `/contact` linked from UI in places → **no route** found. |
| **Tests** | No automated test suite documented in repo for services/API. |
| **App metadata** | Root layout may still use default Next.js title/description. |

## Potential bugs and risks

1. **Unauthenticated `POST /api/v1`** — creates products without auth (production risk).
2. **`handleService` non-AppError path** — `NextResponse.json` for generic errors may omit `{ status: 500 }`, so clients could see **HTTP 200** with an error payload. See `utils/handle-service.ts`.
3. **Typo** — `fetchAdminProductsForTableSerivce` in `services/products/fetch.ts` (misspelled `Service`); imports must match or be renamed.
4. **Admin product table service** — filter/pagination fields (e.g. `categoryId`) may be partially unused; verify when wiring real filters.
5. **Schema vs older docs** — Some external/memory docs may mention **ARCHIVED** product status or a **cart** table; **Prisma schema is authoritative**.

## Reconciliation with external memory notes

If you keep notes under `.claude/.../memory/`:

- **Services/DTOs complete** for products/categories — largely accurate.
- **“Admin operations ~95%”** — accurate for **services**, not for **wired admin UI**.
- **Cart persistence** — requires **new schema** + services; not only “missing services.”

## Suggested priority order

1. Authentication + middleware for `/admin` and mutating APIs.  
2. Expand and secure HTTP API (or server actions with explicit auth).  
3. Wire admin UI to services or APIs.  
4. Orders + cart: schema (cart, user–order if needed) → DTOs → services → UI.  
5. Fix `handleService` status code, broken routes (`/categories/[id]`, `/contact`), folder typo `categpries`.  
6. Add tests for services and critical API paths.

---

[← Architecture summary](./architecture-summary.md) · [Data flow and diagrams](./data-flow-and-diagrams.md)
