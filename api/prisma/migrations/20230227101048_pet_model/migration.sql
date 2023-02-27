/*
  Warnings:

  - You are about to drop the column `petId` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locationId]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_petId_fkey";

-- DropIndex
DROP INDEX "Location_petId_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "petId";

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "locationId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pet_locationId_key" ON "Pet"("locationId");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
