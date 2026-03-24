/*
  Warnings:

  - Changed the type of `githubId` on the `Developer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Developer" DROP COLUMN "githubId",
ADD COLUMN     "githubId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Developer_githubId_key" ON "Developer"("githubId");
