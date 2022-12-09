-- CreateEnum
CREATE TYPE "USERROLE" AS ENUM ('ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "PASSWORDTYPE" AS ENUM ('TEMP', 'PERM');

-- CreateEnum
CREATE TYPE "USERSTATUS" AS ENUM ('ACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "INVENTORYSTATUS" AS ENUM ('PENDING', 'PROCESSING', 'INTRANSIT', 'DELIVERED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" VARCHAR(11) NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "passwordType" "PASSWORDTYPE" NOT NULL DEFAULT 'TEMP',
    "role" "USERROLE" NOT NULL DEFAULT 'ADMIN',
    "status" "USERSTATUS" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "status" "INVENTORYSTATUS" NOT NULL DEFAULT 'PENDING',
    "fee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "senderName" VARCHAR(50),
    "sendePhone" VARCHAR(50),
    "senderAddress" VARCHAR(100),
    "recipientName" VARCHAR(50),
    "recipientPhone" VARCHAR(50),
    "recipientAddress" VARCHAR(100),
    "description" TEXT NOT NULL,
    "comment" VARCHAR(255),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryHistory" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_telephone_key" ON "User"("telephone");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD CONSTRAINT "InventoryHistory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD CONSTRAINT "InventoryHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
