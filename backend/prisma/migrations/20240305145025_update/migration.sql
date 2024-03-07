-- AlterTable
ALTER TABLE "AccountType" ADD COLUMN     "lastModifiedByUserId" INTEGER;

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "lastModifiedByUserId" INTEGER;

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "lastModifiedByUserId" INTEGER;

-- AlterTable
ALTER TABLE "branches" ADD COLUMN     "lastModifiedByUserId" INTEGER;

-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "lastModifiedByUserId" INTEGER;

-- AlterTable
ALTER TABLE "tax_identities" ADD COLUMN     "lastModifiedByUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_lastModifiedByUserId_fkey" FOREIGN KEY ("lastModifiedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_identities" ADD CONSTRAINT "tax_identities_lastModifiedByUserId_fkey" FOREIGN KEY ("lastModifiedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branches" ADD CONSTRAINT "branches_lastModifiedByUserId_fkey" FOREIGN KEY ("lastModifiedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_lastModifiedByUserId_fkey" FOREIGN KEY ("lastModifiedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountType" ADD CONSTRAINT "AccountType_lastModifiedByUserId_fkey" FOREIGN KEY ("lastModifiedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_lastModifiedByUserId_fkey" FOREIGN KEY ("lastModifiedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
