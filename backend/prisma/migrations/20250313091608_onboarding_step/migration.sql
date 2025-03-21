-- AlterTable
ALTER TABLE "Developer" ADD COLUMN     "firstTimeUser" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "OnboardingStep" (
    "id" SERIAL NOT NULL,
    "developerId" INTEGER NOT NULL,
    "stepNumber" INTEGER NOT NULL DEFAULT 1,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnboardingStep_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OnboardingStep" ADD CONSTRAINT "OnboardingStep_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
