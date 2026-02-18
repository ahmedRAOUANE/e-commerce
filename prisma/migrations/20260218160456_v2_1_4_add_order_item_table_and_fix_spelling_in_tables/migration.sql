/*
  Warnings:

  - You are about to drop the `Analitycs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Oreders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `phnoe` on the `AppData` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Products` table. All the data in the column will be lost.
  - Added the required column `phone` to the `AppData` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Analitycs";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Oreders";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PROCESSING',
    "orderId" INTEGER NOT NULL,
    "payment" TEXT NOT NULL DEFAULT 'PENDING',
    "totalOrderedItemsCount" INTEGER NOT NULL,
    "ownerContact" TEXT NOT NULL,
    "ownerName" TEXT DEFAULT 'unknown'
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceAtPurchase" INTEGER NOT NULL,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Analytics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalProductsCount" INTEGER NOT NULL DEFAULT 0,
    "activeProductsCount" INTEGER NOT NULL DEFAULT 0,
    "draftProductsCount" INTEGER NOT NULL DEFAULT 0,
    "outOfStockProductsCount" INTEGER NOT NULL DEFAULT 0,
    "totalItemsCount" INTEGER NOT NULL DEFAULT 0,
    "totalCategoryCount" INTEGER NOT NULL DEFAULT 0,
    "activeCategoryCount" INTEGER NOT NULL DEFAULT 0,
    "inactiveCategoryCount" INTEGER NOT NULL DEFAULT 0,
    "totalOrdersCount" INTEGER NOT NULL DEFAULT 0,
    "pendingOrdersCount" INTEGER NOT NULL DEFAULT 0
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AppData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "storeName" TEXT NOT NULL,
    "supportEmail" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'ARABIC',
    "storeAddress" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_AppData" ("createdAt", "id", "language", "primaryColor", "storeAddress", "storeName", "supportEmail", "theme", "updatedAt") SELECT "createdAt", "id", "language", "primaryColor", "storeAddress", "storeName", "supportEmail", "theme", "updatedAt" FROM "AppData";
DROP TABLE "AppData";
ALTER TABLE "new_AppData" RENAME TO "AppData";
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "salesCount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "imgs" JSONB NOT NULL,
    "tags" JSONB,
    "inventory" JSONB NOT NULL,
    "shipping" JSONB NOT NULL,
    "metadata" JSONB,
    "categoryId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("categoryId", "createdAt", "description", "discount", "id", "imgs", "inventory", "metadata", "name", "price", "salesCount", "shipping", "status", "tags", "updatedAt") SELECT "categoryId", "createdAt", "description", "discount", "id", "imgs", "inventory", "metadata", "name", "price", "salesCount", "shipping", "status", "tags", "updatedAt" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
CREATE INDEX "Products_categoryId_idx" ON "Products"("categoryId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_orderId_productId_key" ON "OrderItem"("orderId", "productId");
