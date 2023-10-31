-- CreateTable
CREATE TABLE "StarSign" (
    "signId" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "StarSign_pkey" PRIMARY KEY ("signId")
);

-- CreateTable
CREATE TABLE "Predictions" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "signId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Predictions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StarSign_signId_key" ON "StarSign"("signId");

-- AddForeignKey
ALTER TABLE "Predictions" ADD CONSTRAINT "Predictions_signId_fkey" FOREIGN KEY ("signId") REFERENCES "StarSign"("signId") ON DELETE RESTRICT ON UPDATE CASCADE;
