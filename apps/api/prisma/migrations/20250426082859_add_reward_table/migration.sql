-- CreateTable
CREATE TABLE "Reward" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "description" TEXT,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);
