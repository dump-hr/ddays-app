-- CreateTable
CREATE TABLE "UserToPrinter" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "printerId" INTEGER NOT NULL,

    CONSTRAINT "UserToPrinter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Printer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Printer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserToPrinter" ADD CONSTRAINT "UserToPrinter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToPrinter" ADD CONSTRAINT "UserToPrinter_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES "Printer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
