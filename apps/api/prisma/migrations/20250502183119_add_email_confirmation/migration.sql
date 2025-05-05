-- CreateTable
CREATE TABLE "EmailConfirmationToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailConfirmationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailConfirmationToken_token_key" ON "EmailConfirmationToken"("token");

-- CreateIndex
CREATE INDEX "EmailConfirmationToken_userId_idx" ON "EmailConfirmationToken"("userId");

-- AddForeignKey
ALTER TABLE "EmailConfirmationToken" ADD CONSTRAINT "EmailConfirmationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
