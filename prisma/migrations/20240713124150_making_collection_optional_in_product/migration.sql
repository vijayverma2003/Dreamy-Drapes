-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_collectionId_fkey`;

-- AlterTable
ALTER TABLE `Product` MODIFY `collectionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `Collection`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
