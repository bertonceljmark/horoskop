/*
  Warnings:

  - Added the required column `signId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "signId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WeeklyPredictions" ADD CONSTRAINT "WeeklyPredictions_signId_fkey" FOREIGN KEY ("signId") REFERENCES "StarSign"("signId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_signId_fkey" FOREIGN KEY ("signId") REFERENCES "StarSign"("signId") ON DELETE RESTRICT ON UPDATE CASCADE;
