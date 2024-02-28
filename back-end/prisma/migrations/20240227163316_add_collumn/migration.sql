/*
  Warnings:

  - Added the required column `lunchTimeEnd` to the `points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lunchTimeStart` to the `points` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "points" ADD COLUMN     "lunchTimeEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lunchTimeStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "onLine" BOOLEAN NOT NULL DEFAULT true;
