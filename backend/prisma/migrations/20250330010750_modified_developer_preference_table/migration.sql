/*
  Warnings:

  - A unique constraint covering the columns `[developerId]` on the table `Developer_Preferences` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Developer_Preferences_developerId_key" ON "Developer_Preferences"("developerId");
