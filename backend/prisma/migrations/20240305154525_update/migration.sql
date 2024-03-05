/*
  Warnings:

  - You are about to drop the `AccountSubtype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AccountType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccountSubtype" DROP CONSTRAINT "AccountSubtype_accountTypeId_fkey";

-- DropForeignKey
ALTER TABLE "AccountSubtype" DROP CONSTRAINT "AccountSubtype_lastModifiedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "AccountType" DROP CONSTRAINT "AccountType_lastModifiedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_accountTypeId_fkey";

-- DropTable
DROP TABLE "AccountSubtype";

-- DropTable
DROP TABLE "AccountType";

-- CreateTable
CREATE TABLE "account_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastModifiedByUserId" INTEGER,

    CONSTRAINT "account_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_subtypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "accountTypeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastModifiedByUserId" INTEGER,

    CONSTRAINT "account_subtypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_types_name_key" ON "account_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "account_subtypes_name_key" ON "account_subtypes"("name");

-- AddForeignKey
ALTER TABLE "account_types" ADD CONSTRAINT "account_types_lastModifiedByUserId_fkey" FOREIGN KEY ("lastModifiedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_subtypes" ADD CONSTRAINT "account_subtypes_accountTypeId_fkey" FOREIGN KEY ("accountTypeId") REFERENCES "account_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_subtypes" ADD CONSTRAINT "account_subtypes_lastModifiedByUserId_fkey" FOREIGN KEY ("lastModifiedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_accountTypeId_fkey" FOREIGN KEY ("accountTypeId") REFERENCES "account_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
