-- AlterTable
ALTER TABLE `orders` ADD COLUMN `courier` ENUM('UPS', 'PACKETA', 'DPD', 'INPOST') NOT NULL DEFAULT 'UPS',
    ADD COLUMN `shippingAddress` VARCHAR(191) NULL,
    ADD COLUMN `trackingNumber` VARCHAR(191) NULL;
