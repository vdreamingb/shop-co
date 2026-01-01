/*
  Warnings:

  - You are about to drop the column `name` on the `Expediations` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Expediations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expediations" DROP COLUMN "name",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "ExpeditionItem" (
    "id" SERIAL NOT NULL,
    "expediationId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ExpeditionItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpeditionItem_expediationId_productId_key" ON "ExpeditionItem"("expediationId", "productId");

-- AddForeignKey
ALTER TABLE "Expediations" ADD CONSTRAINT "Expediations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpeditionItem" ADD CONSTRAINT "ExpeditionItem_expediationId_fkey" FOREIGN KEY ("expediationId") REFERENCES "Expediations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpeditionItem" ADD CONSTRAINT "ExpeditionItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
