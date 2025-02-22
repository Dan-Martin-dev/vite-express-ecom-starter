/*
  Warnings:

  - The `beforePrice` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "beforePrice",
ADD COLUMN     "beforePrice" DECIMAL(65,30) DEFAULT 0.00;
