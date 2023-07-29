/*
  Warnings:

  - You are about to drop the `players` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "players";

-- CreateTable
CREATE TABLE "player" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "ranking" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_phone_key" ON "player"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "player_email_key" ON "player"("email");

-- CreateIndex
CREATE UNIQUE INDEX "player_name_key" ON "player"("name");
