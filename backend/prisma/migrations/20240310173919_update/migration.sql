/*
  Warnings:

  - You are about to drop the column `accountTypeId` on the `account_subtypes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `account_subtypes` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `account_subtypes` table. All the data in the column will be lost.
  - You are about to drop the column `lastModifiedByUserId` on the `account_subtypes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `account_subtypes` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `account_subtypes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `createdAt` on the `account_types` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `account_types` table. All the data in the column will be lost.
  - You are about to drop the column `lastModifiedByUserId` on the `account_types` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `account_types` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `account_types` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `accountSubtypeId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `accountTypeId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `alternatePhone` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `isKey` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `isVip` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `lastModifiedByUserId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `registeredPhone` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `taxIdentityId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `accounts` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `accountId` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `alternatePhone` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `lastModifiedByUserId` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `account_subtypes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `account_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_subtype_id` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_type_id` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alternate_phone` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registered_phone` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_id` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alternate_phone` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account_subtypes" DROP CONSTRAINT "account_subtypes_accountTypeId_fkey";

-- DropForeignKey
ALTER TABLE "account_subtypes" DROP CONSTRAINT "account_subtypes_lastModifiedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "account_types" DROP CONSTRAINT "account_types_lastModifiedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_accountSubtypeId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_accountTypeId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_branchId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_lastModifiedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_parentId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_taxIdentityId_fkey";

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_accountId_fkey";

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_addressId_fkey";

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_branchId_fkey";

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_lastModifiedByUserId_fkey";

-- DropIndex
DROP INDEX "account_subtypes_name_key";

-- DropIndex
DROP INDEX "account_types_name_key";

-- DropIndex
DROP INDEX "accounts_registeredPhone_key";

-- DropIndex
DROP INDEX "contacts_email_key";

-- DropIndex
DROP INDEX "contacts_phone_key";

-- AlterTable
ALTER TABLE "account_subtypes" DROP COLUMN "accountTypeId",
DROP COLUMN "createdAt",
DROP COLUMN "isDeleted",
DROP COLUMN "lastModifiedByUserId",
DROP COLUMN "updatedAt",
ADD COLUMN     "account_type_id" INTEGER,
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_modified_by_user_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "account_types" DROP COLUMN "createdAt",
DROP COLUMN "isDeleted",
DROP COLUMN "lastModifiedByUserId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_modified_by_user_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "accountSubtypeId",
DROP COLUMN "accountTypeId",
DROP COLUMN "alternatePhone",
DROP COLUMN "branchId",
DROP COLUMN "createdAt",
DROP COLUMN "isDeleted",
DROP COLUMN "isKey",
DROP COLUMN "isVip",
DROP COLUMN "lastModifiedByUserId",
DROP COLUMN "parentId",
DROP COLUMN "registeredPhone",
DROP COLUMN "taxIdentityId",
DROP COLUMN "updatedAt",
ADD COLUMN     "account_subtype_id" INTEGER NOT NULL,
ADD COLUMN     "account_type_id" INTEGER NOT NULL,
ADD COLUMN     "alternate_phone" VARCHAR(20) NOT NULL,
ADD COLUMN     "branch_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_key" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_vip" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_modified_by_user_id" INTEGER,
ADD COLUMN     "parent_id" INTEGER,
ADD COLUMN     "registered_phone" VARCHAR(20) NOT NULL,
ADD COLUMN     "tax_identity_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "accountId",
DROP COLUMN "addressId",
DROP COLUMN "alternatePhone",
DROP COLUMN "branchId",
DROP COLUMN "createdAt",
DROP COLUMN "isDeleted",
DROP COLUMN "lastModifiedByUserId",
DROP COLUMN "updatedAt",
ADD COLUMN     "account_id" INTEGER,
ADD COLUMN     "address_id" INTEGER NOT NULL,
ADD COLUMN     "alternate_phone" VARCHAR(20) NOT NULL,
ADD COLUMN     "branch_id" INTEGER,
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_modified_by_user_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_last_modified_by_user_id_fkey" FOREIGN KEY ("last_modified_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_types" ADD CONSTRAINT "account_types_last_modified_by_user_id_fkey" FOREIGN KEY ("last_modified_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_subtypes" ADD CONSTRAINT "account_subtypes_account_type_id_fkey" FOREIGN KEY ("account_type_id") REFERENCES "account_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_subtypes" ADD CONSTRAINT "account_subtypes_last_modified_by_user_id_fkey" FOREIGN KEY ("last_modified_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_account_type_id_fkey" FOREIGN KEY ("account_type_id") REFERENCES "account_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_account_subtype_id_fkey" FOREIGN KEY ("account_subtype_id") REFERENCES "account_subtypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_tax_identity_id_fkey" FOREIGN KEY ("tax_identity_id") REFERENCES "tax_identities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_last_modified_by_user_id_fkey" FOREIGN KEY ("last_modified_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
