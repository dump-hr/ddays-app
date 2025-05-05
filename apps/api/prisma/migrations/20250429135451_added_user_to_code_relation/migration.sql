-- CreateTable
CREATE TABLE "UserToCode" (
    "userId" INTEGER NOT NULL,
    "codeId" INTEGER NOT NULL,

    CONSTRAINT "UserToCode_pkey" PRIMARY KEY ("userId","codeId")
);

-- AddForeignKey
ALTER TABLE "UserToCode" ADD CONSTRAINT "UserToCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserToCode" ADD CONSTRAINT "UserToCode_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "Code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
