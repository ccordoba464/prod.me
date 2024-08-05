/*
  Warnings:

  - You are about to drop the column `cover_image_url` on the `Track` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Track" DROP COLUMN "cover_image_url",
ADD COLUMN     "image_path" TEXT;
