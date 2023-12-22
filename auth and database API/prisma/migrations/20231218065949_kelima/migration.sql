/*
  Warnings:

  - You are about to alter the column `profilePic` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(254)`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `profilePic` VARCHAR(254) NOT NULL DEFAULT 'https://storage.googleapis.com/opticool-bucket/Get%20the%20We%20Heart%20It%20app!.jpeg';
