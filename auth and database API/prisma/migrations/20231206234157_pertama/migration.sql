-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(64) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(15) NOT NULL DEFAULT '',
    `password` VARCHAR(255) NOT NULL,
    `profilePic` VARCHAR(255) NOT NULL DEFAULT 'https://storage.googleapis.com/opticool-bucket/Get%20the%20We%20Heart%20It%20app!.jpeg',
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eyeglasses` (
    `idEyeglass` INTEGER NOT NULL AUTO_INCREMENT,
    `Link` VARCHAR(255) NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `Brand` VARCHAR(255) NOT NULL,
    `FaceShape` VARCHAR(15) NOT NULL,
    `Price` VARCHAR(10) NOT NULL,
    `Gender` VARCHAR(10) NOT NULL,
    `FrameColour` VARCHAR(100) NOT NULL,
    `FrameShape` VARCHAR(20) NOT NULL,
    `FrameStyle` VARCHAR(50) NOT NULL,
    `LinkPic1` VARCHAR(255) NOT NULL,
    `LinkPic2` VARCHAR(255) NOT NULL,
    `LinkPic3` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idEyeglass`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
