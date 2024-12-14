/*
  Warnings:

  - You are about to drop the `verification_code` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `verification_code` DROP FOREIGN KEY `verification_code_user_id_fkey`;

-- DropTable
DROP TABLE `verification_code`;
