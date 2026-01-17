/*
  Warnings:

  - A unique constraint covering the columns `[rfpId]` on the table `Proposal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vendorId]` on the table `Proposal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rfpId]` on the table `RFPVendor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vendorId]` on the table `RFPVendor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ProposalEvaluation" (
    "id" TEXT NOT NULL,
    "rfpId" TEXT NOT NULL,
    "summary" JSONB NOT NULL,
    "recommendedId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProposalEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProposalEvaluation_rfpId_key" ON "ProposalEvaluation"("rfpId");

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_rfpId_key" ON "Proposal"("rfpId");

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_vendorId_key" ON "Proposal"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "RFPVendor_rfpId_key" ON "RFPVendor"("rfpId");

-- CreateIndex
CREATE UNIQUE INDEX "RFPVendor_vendorId_key" ON "RFPVendor"("vendorId");

-- AddForeignKey
ALTER TABLE "ProposalEvaluation" ADD CONSTRAINT "ProposalEvaluation_rfpId_fkey" FOREIGN KEY ("rfpId") REFERENCES "RFP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
