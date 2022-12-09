/*
  Warnings:

  - Added the required column `trackingId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "trackingId" VARCHAR(100) NOT NULL;
