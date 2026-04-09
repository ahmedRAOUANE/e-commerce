# Data flow, imports, and diagrams

**Last updated:** 2026-04-08

## Typical server component flow (public products)

```mermaid
flowchart LR
  Page["app/products/page.tsx"]
  Svc["fetchPublicProductsService"]
  Prisma["prisma.products.findMany"]
  DTO["publicProductOutputDto.safeParse"]
  Page --> Svc --> Prisma --> DTO --> Page
```

## API route flow (`app/api/v1/route.ts`)

```mermaid
sequenceDiagram
  participant Client
  participant Route as app/api/v1/route.ts
  participant Zod as CreateProductDto.safeParse
  participant Svc as createProductService
  participant HS as handleService
  Client->>Route: POST JSON
  Route->>Zod: validate
  alt invalid
    Route-->>Client: 400 validation
  else valid
    Route->>HS: handleService(createProductService(data), 201)
    HS->>Svc: await
    Svc-->>HS: result or throw
    HS-->>Client: JSON success or AppError shape
  end
```

## Intended layering

```mermaid
flowchart TB
  UI[App Router pages / components]
  API[Route handlers]
  SVC[services/*]
  DTO[dto/* Zod]
  DB[(Prisma / SQLite)]
  UI --> SVC
  UI --> API
  API --> SVC
  SVC --> DTO
  SVC --> DB
```

**Current caveat:** many UI paths use **`shared/placeholders`** or **inline admin mocks** instead of services.

## Mind map (feature × status)

```mermaid
mindmap
  root((E-commerce app))
    Stack
      Next 16 App Router
      Prisma 7 SQLite
      Zod DTOs
    Catalog DB
      Products CRUD services
      Categories CRUD services
      Prisma schema
    Public storefront
      Home featured real DB
      Product list real DB
      Product detail real DB
      Categories UI placeholders
      Cart stub
    Admin UI
      Layout shell
      Products list mock
      Categories list mock
      Orders mock
      New product form not wired
    API
      GET one product
      POST create product no auth
    Security
      No middleware
      No auth in codebase
    Future
      Auth
      Orders services
      Cart schema plus services
      Tests
```

## Key import directions

- **Pages (RSC)** → `@/services/products/fetch` (and similar) → `@/lib/prisma` (inside services).
- **Services** → `@/dto/*`, `@/errors/*`, `@/dto/select.dto` (`buildSelect`), `@/lib/prisma`.
- **API route** → DTOs, `handleService`, product services.

---

[← Architecture summary](./architecture-summary.md) · [Blockers and risks →](./blockers-gaps-and-risks.md)
