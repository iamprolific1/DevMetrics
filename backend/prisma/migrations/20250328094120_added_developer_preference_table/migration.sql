-- CreateEnum
CREATE TYPE "FREQUENCY" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- CreateTable
CREATE TABLE "Developer_Preferences" (
    "id" SERIAL NOT NULL,
    "developerId" INTEGER NOT NULL,
    "languages" JSONB NOT NULL DEFAULT '[]',
    "frequency" "FREQUENCY" NOT NULL,
    "codingGoal" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Developer_Preferences_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Developer_Preferences" ADD CONSTRAINT "Developer_Preferences_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
