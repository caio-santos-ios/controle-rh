/*
  Warnings:

  - You are about to drop the column `novoCamppo` on the `points` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "points" DROP COLUMN "novoCamppo",
ALTER COLUMN "startHour" SET DATA TYPE TIMESTAMP;
