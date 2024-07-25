/*
  Warnings:

  - The primary key for the `ProductImage` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `ProductImage` DROP PRIMARY KEY,
    MODIFY `public_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`public_id`);
