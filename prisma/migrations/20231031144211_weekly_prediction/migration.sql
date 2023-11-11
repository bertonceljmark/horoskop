-- CreateTable
CREATE TABLE "WeeklyPredictions" (
    "id" TEXT NOT NULL,
    "signId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "money" INTEGER NOT NULL,
    "love" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeeklyPredictions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WeeklyPredictions" ADD CONSTRAINT "WeeklyPredictions_signId_fkey" FOREIGN KEY ("signId") REFERENCES "StarSign"("signId") ON DELETE RESTRICT ON UPDATE CASCADE;
