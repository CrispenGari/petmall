/*
  Warnings:

  - The values [CAT,DOG] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('CATS', 'DOGS', 'BIRDS', 'RABBITS', 'HORSES', 'FERRETS', 'FISH', 'GUINEA_PIGS', 'RATS_AND_MICE', 'AMPHIBIANS', 'REPTILES');
ALTER TABLE "Pet" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;
