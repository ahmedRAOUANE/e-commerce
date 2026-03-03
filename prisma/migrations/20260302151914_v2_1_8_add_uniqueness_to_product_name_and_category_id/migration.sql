/*
  Warnings:

  - A unique constraint covering the columns `[name,categoryId]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Products_name_categoryId_key" ON "Products"("name", "categoryId");
