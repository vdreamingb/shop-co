/*
  Warnings:

  - Added the required column `detailsId` to the `ExpeditionItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExpeditionItem" ADD COLUMN     "detailsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ExpeditionItem" ADD CONSTRAINT "ExpeditionItem_detailsId_fkey" FOREIGN KEY ("detailsId") REFERENCES "ProductDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
