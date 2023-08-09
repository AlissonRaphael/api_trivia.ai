-- CreateTable
CREATE TABLE "challenge" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerChallenge" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,

    CONSTRAINT "PlayerChallenge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlayerChallenge" ADD CONSTRAINT "PlayerChallenge_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerChallenge" ADD CONSTRAINT "PlayerChallenge_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
