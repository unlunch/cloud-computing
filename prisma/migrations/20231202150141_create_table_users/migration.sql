-- CreateTable
CREATE TABLE `users` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `email_verified_at` DATETIME NULL,
    `password` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NULL,
    `otp_code` VARCHAR(8) NULL,
    `expired_code` DATETIME NULL,
    `phone` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
