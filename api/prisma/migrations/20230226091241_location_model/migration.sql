/*
  Warnings:

  - You are about to drop the column `location` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `price` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `Pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "location",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "subregion" TEXT,
    "timezone" TEXT NOT NULL,
    "streetNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isoCountryCode" TEXT NOT NULL,
    "petId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_id_key" ON "Location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Location_petId_key" ON "Location"("petId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
