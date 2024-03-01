/*
  Warnings:

  - A unique constraint covering the columns `[workDay]` on the table `points` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "points_workDay_key" ON "points"("workDay");
