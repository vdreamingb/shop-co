/*
  Warnings:

  - Added the required column `pricePercent` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductDetails" ADD COLUMN     "pricePercent" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;
