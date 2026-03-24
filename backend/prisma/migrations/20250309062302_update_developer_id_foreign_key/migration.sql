-- DropForeignKey
ALTER TABLE "Code_Quality" DROP CONSTRAINT "Code_Quality_developerId_fkey";

-- DropForeignKey
ALTER TABLE "Commit" DROP CONSTRAINT "Commit_developerId_fkey";

-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_developerId_fkey";

-- DropForeignKey
ALTER TABLE "Pull_Request" DROP CONSTRAINT "Pull_Request_developerId_fkey";

-- AddForeignKey
ALTER TABLE "Commit" ADD CONSTRAINT "Commit_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pull_Request" ADD CONSTRAINT "Pull_Request_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Code_Quality" ADD CONSTRAINT "Code_Quality_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
