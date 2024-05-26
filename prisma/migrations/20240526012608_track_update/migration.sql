-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_current_version_id_fkey";

-- AlterTable
ALTER TABLE "Track" ALTER COLUMN "current_version_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_current_version_id_fkey" FOREIGN KEY ("current_version_id") REFERENCES "Track_version"("id") ON DELETE SET NULL ON UPDATE CASCADE;
