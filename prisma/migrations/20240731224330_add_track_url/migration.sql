/*
  Warnings:

  - You are about to drop the column `cover_image_url` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `file_url` on the `Track_version` table. All the data in the column will be lost.
  - Added the required column `image_path` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `track_url` to the `Track_version` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "cover_image_url",
ADD COLUMN     "image_path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Track_version" DROP COLUMN "file_url",
ADD COLUMN     "track_url" TEXT NOT NULL;
