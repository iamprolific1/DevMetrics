/*
  Warnings:

  - You are about to drop the column `code_smells` on the `Code_Quality` table. All the data in the column will be lost.
  - You are about to drop the column `formatting_errors` on the `Code_Quality` table. All the data in the column will be lost.
  - You are about to drop the column `lint_errors` on the `Code_Quality` table. All the data in the column will be lost.
  - You are about to drop the column `maintainability_score` on the `Code_Quality` table. All the data in the column will be lost.
  - You are about to drop the column `additions` on the `Commit` table. All the data in the column will be lost.
  - You are about to drop the column `commit_count` on the `Commit` table. All the data in the column will be lost.
  - You are about to drop the column `deletions` on the `Commit` table. All the data in the column will be lost.
  - You are about to drop the column `issue_count` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `pr_count` on the `Pull_Request` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sha]` on the table `Commit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codeSmells` to the `Code_Quality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maintainabilityScore` to the `Code_Quality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Commit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sha` to the `Commit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Commit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Commit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Pull_Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Pull_Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Code_Quality" DROP COLUMN "code_smells",
DROP COLUMN "formatting_errors",
DROP COLUMN "lint_errors",
DROP COLUMN "maintainability_score",
ADD COLUMN     "codeSmells" INTEGER NOT NULL,
ADD COLUMN     "formattingErrors" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lintErrors" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maintainabilityScore" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Commit" DROP COLUMN "additions",
DROP COLUMN "commit_count",
DROP COLUMN "deletions",
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "sha" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "issue_count",
ADD COLUMN     "closedAt" TIMESTAMP(3),
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pull_Request" DROP COLUMN "pr_count",
ADD COLUMN     "mergedAt" TIMESTAMP(3),
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Commit_sha_key" ON "Commit"("sha");
