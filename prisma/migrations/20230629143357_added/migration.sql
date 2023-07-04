-- CreateTable
CREATE TABLE `Replies` (
    `replyId` INTEGER NOT NULL AUTO_INCREMENT,
    `commentId` INTEGER NOT NULL,
    `reply` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`replyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Replies` ADD CONSTRAINT `Replies_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comments`(`commentId`) ON DELETE RESTRICT ON UPDATE CASCADE;
