/*
  Warnings:

  - You are about to drop the column `address` on the `Org` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Org" DROP COLUMN "address",
ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'null';
