/*
  Warnings:

  - The primary key for the `Issue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Pull_Request` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Issue_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Issue_id_seq";

-- AlterTable
ALTER TABLE "Pull_Request" DROP CONSTRAINT "Pull_Request_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Pull_Request_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Pull_Request_id_seq";
