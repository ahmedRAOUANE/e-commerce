/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Category";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Product";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Products" (
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
    "orderId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Oreders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "metadata" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Oreders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PROCESSING',
    "orderId" INTEGER NOT NULL,
    "payment" TEXT NOT NULL DEFAULT 'PENDING',
    "totalOrderedItemsCount" INTEGER NOT NULL,
    "eachProdectCount" JSONB NOT NULL,
    "ownerContact" TEXT NOT NULL,
    "ownerName" TEXT DEFAULT 'unknown'
);

-- CreateTable
CREATE TABLE "AppData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "storeName" TEXT NOT NULL,
    "supportEmail" TEXT NOT NULL,
    "phnoe" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'ARABIC',
    "storeAddress" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Analitycs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalProductsCount" INTEGER NOT NULL DEFAULT 0,
    "activeProducrsCount" INTEGER NOT NULL DEFAULT 0,
    "draftProductsCount" INTEGER NOT NULL DEFAULT 0,
    "outOfStackProductsCount" INTEGER NOT NULL DEFAULT 0,
    "totalItemsCount" INTEGER NOT NULL DEFAULT 0,
    "totalCategoryCount" INTEGER NOT NULL DEFAULT 0,
    "activeCategoryCount" INTEGER NOT NULL DEFAULT 0,
    "inactiveCategoryCount" INTEGER NOT NULL DEFAULT 0,
    "totalOrdersCount" INTEGER NOT NULL DEFAULT 0,
    "pendingOrdersCount" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE INDEX "Products_categoryId_idx" ON "Products"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");
