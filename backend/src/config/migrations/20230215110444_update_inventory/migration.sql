/*
  Warnings:

  - You are about to drop the column `sendePhone` on the `Inventory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "sendePhone",
ADD COLUMN     "senderPhone" VARCHAR(50);
