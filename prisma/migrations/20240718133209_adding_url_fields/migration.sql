/*
  Warnings:

  - You are about to drop the column `image` on the `ProductImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ProductImage` DROP COLUMN `image`,
    ADD COLUMN `publicId` VARCHAR(191) NULL,
    ADD COLUMN `url` VARCHAR(191) NULL;
