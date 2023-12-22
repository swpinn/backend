/*
  Warnings:

  - Added the required column `FrameMaterial` to the `eyeglasses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `eyeglasses` ADD COLUMN `FrameMaterial` VARCHAR(100) NOT NULL;
