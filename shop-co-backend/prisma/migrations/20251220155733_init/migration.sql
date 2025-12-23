/*
  Warnings:

  - You are about to drop the column `dimensions` on the `ProductDetails` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `ProductDetails` table. All the data in the column will be lost.
  - Added the required column `gender` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductDetails" DROP COLUMN "dimensions",
DROP COLUMN "weight",
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "style" TEXT,
ADD COLUMN     "type" TEXT;
