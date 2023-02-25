-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Category" ADD VALUE 'BIRDS';
ALTER TYPE "Category" ADD VALUE 'RABBITS';
ALTER TYPE "Category" ADD VALUE 'HORSES';
ALTER TYPE "Category" ADD VALUE 'FERRETS';
ALTER TYPE "Category" ADD VALUE 'FISH';
ALTER TYPE "Category" ADD VALUE 'GUINEA_PIGS';
ALTER TYPE "Category" ADD VALUE 'RATS_AND_MICE';
ALTER TYPE "Category" ADD VALUE 'AMPHIBIANS';
ALTER TYPE "Category" ADD VALUE 'REPTILES';
