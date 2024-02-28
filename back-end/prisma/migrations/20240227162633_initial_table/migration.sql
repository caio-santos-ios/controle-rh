-- CreateTable
CREATE TABLE "collaborators" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "registerNumber" VARCHAR(5) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "staff" BOOLEAN NOT NULL DEFAULT false,
    "director" BOOLEAN NOT NULL DEFAULT false,
    "hourCharge" INTEGER NOT NULL DEFAULT 8,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "points" (
    "id" SERIAL NOT NULL,
    "startHour" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endHour" TIMESTAMP NOT NULL,
    "workDay" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collaboratorId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "collaborators_id_key" ON "collaborators"("id");

-- CreateIndex
CREATE UNIQUE INDEX "collaborators_registerNumber_key" ON "collaborators"("registerNumber");

-- CreateIndex
CREATE UNIQUE INDEX "collaborators_email_key" ON "collaborators"("email");

-- CreateIndex
CREATE UNIQUE INDEX "points_id_key" ON "points"("id");

-- AddForeignKey
ALTER TABLE "points" ADD CONSTRAINT "points_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "collaborators"("id") ON DELETE CASCADE ON UPDATE CASCADE;
