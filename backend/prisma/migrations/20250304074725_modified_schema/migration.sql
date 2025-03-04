-- AlterTable
ALTER TABLE "Developer" ADD COLUMN     "refreshToken" TEXT,
ALTER COLUMN "accessToken" DROP NOT NULL;
