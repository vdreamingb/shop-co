/*
  Warnings:

  - You are about to drop the column `userId` on the `BlackListedToken` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlackListedToken" DROP CONSTRAINT "BlackListedToken_userId_fkey";

-- AlterTable
ALTER TABLE "BlackListedToken" DROP COLUMN "userId";
