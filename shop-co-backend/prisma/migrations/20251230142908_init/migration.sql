/*
  Warnings:

  - You are about to drop the column `productId` on the `Expediations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expediations" DROP CONSTRAINT "Expediations_productId_fkey";

-- AlterTable
ALTER TABLE "Expediations" DROP COLUMN "productId";
