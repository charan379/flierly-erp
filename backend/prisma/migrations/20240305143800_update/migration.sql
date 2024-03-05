-- CreateTable
CREATE TABLE "organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "line1" TEXT NOT NULL,
    "line2" TEXT NOT NULL,
    "line3" TEXT,
    "landmark" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "accountId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_identities" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "gst" VARCHAR(55),
    "gstRegistrationDate" TIMESTAMP(3),
    "gstVerified" BOOLEAN NOT NULL DEFAULT false,
    "gstAddressId" INTEGER,
    "pan" VARCHAR(30),
    "panVerified" BOOLEAN NOT NULL DEFAULT false,
    "vat" VARCHAR(55),
    "tin" VARCHAR(55),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tax_identities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branches" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "email" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "alternatePhone" VARCHAR(20) NOT NULL,
    "addressId" INTEGER NOT NULL,
    "taxIdentityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "alternatePhone" VARCHAR(20) NOT NULL,
    "addressId" INTEGER NOT NULL,
    "branchId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountSubtype" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "accountTypeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastModifiedByUserId" INTEGER,

    CONSTRAINT "AccountSubtype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "accountTypeId" INTEGER NOT NULL,
    "isVip" BOOLEAN NOT NULL DEFAULT false,
    "isKey" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "registeredPhone" VARCHAR(20) NOT NULL,
    "alternatePhone" VARCHAR(20) NOT NULL,
    "email" TEXT NOT NULL,
    "branchId" INTEGER NOT NULL,
    "taxIdentityId" INTEGER,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_name_key" ON "organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "organization_email_key" ON "organization"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organization_phone_key" ON "organization"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "tax_identities_gstAddressId_key" ON "tax_identities"("gstAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "branches_name_key" ON "branches"("name");

-- CreateIndex
CREATE UNIQUE INDEX "branches_email_key" ON "branches"("email");

-- CreateIndex
CREATE UNIQUE INDEX "branches_phone_key" ON "branches"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "branches_addressId_key" ON "branches"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_phone_key" ON "contacts"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "AccountType_name_key" ON "AccountType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AccountSubtype_name_key" ON "AccountSubtype"("name");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_registeredPhone_key" ON "accounts"("registeredPhone");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_identities" ADD CONSTRAINT "tax_identities_gstAddressId_fkey" FOREIGN KEY ("gstAddressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branches" ADD CONSTRAINT "branches_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branches" ADD CONSTRAINT "branches_taxIdentityId_fkey" FOREIGN KEY ("taxIdentityId") REFERENCES "tax_identities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountSubtype" ADD CONSTRAINT "AccountSubtype_accountTypeId_fkey" FOREIGN KEY ("accountTypeId") REFERENCES "AccountType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountSubtype" ADD CONSTRAINT "AccountSubtype_lastModifiedByUserId_fkey" FOREIGN KEY ("lastModifiedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_accountTypeId_fkey" FOREIGN KEY ("accountTypeId") REFERENCES "AccountType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_taxIdentityId_fkey" FOREIGN KEY ("taxIdentityId") REFERENCES "tax_identities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
