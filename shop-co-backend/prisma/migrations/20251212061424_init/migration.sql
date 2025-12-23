/*
  Warnings:

  - Added the required column `rid` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "rid" TEXT NOT NULL;
