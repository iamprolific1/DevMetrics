-- CreateEnum
CREATE TYPE "PR_STATUS" AS ENUM ('OPEN', 'CLOSED', 'MERGED');

-- CreateEnum
CREATE TYPE "ISSUE_STATUS" AS ENUM ('OPEN', 'CLOSED', 'RESOLVED', 'IGNORED');

-- CreateTable
CREATE TABLE "Developer" (
    "id" SERIAL NOT NULL,
    "githubId" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "email" TEXT,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commit" (
    "id" SERIAL NOT NULL,
    "developerId" INTEGER NOT NULL,
    "repo" TEXT NOT NULL,
    "commit_count" INTEGER NOT NULL,
    "additions" INTEGER NOT NULL,
    "deletions" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pull_Request" (
    "id" SERIAL NOT NULL,
    "developerId" INTEGER NOT NULL,
    "repo" TEXT NOT NULL,
    "pr_count" INTEGER NOT NULL,
    "status" "PR_STATUS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pull_Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "developerId" INTEGER NOT NULL,
    "repo" TEXT NOT NULL,
    "issue_count" INTEGER NOT NULL,
    "status" "ISSUE_STATUS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Code_Quality" (
    "id" SERIAL NOT NULL,
    "developerId" INTEGER NOT NULL,
    "repo" TEXT NOT NULL,
    "lint_errors" INTEGER NOT NULL DEFAULT 0,
    "formatting_errors" INTEGER NOT NULL DEFAULT 0,
    "code_smells" INTEGER NOT NULL,
    "maintainability_score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Code_Quality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Developer_githubId_key" ON "Developer"("githubId");

-- AddForeignKey
ALTER TABLE "Commit" ADD CONSTRAINT "Commit_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pull_Request" ADD CONSTRAINT "Pull_Request_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Code_Quality" ADD CONSTRAINT "Code_Quality_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
