-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_orgId_fkey";

-- DropForeignKey
ALTER TABLE "PetAttribute" DROP CONSTRAINT "PetAttribute_petId_fkey";

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetAttribute" ADD CONSTRAINT "PetAttribute_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
