/*
  Warnings:

  - You are about to drop the column `available` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Dept` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dept" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "available",
ADD COLUMN     "active" BOOLEAN NOT NULL;
