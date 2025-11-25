CREATE TABLE `referral_codes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(50) NOT NULL,
	`user_id` int,
	`purchase_id` int,
	`discount_type` enum('percentage','fixed') NOT NULL,
	`discount_value` int NOT NULL,
	`usage_limit` int NOT NULL DEFAULT 1,
	`usage_count` int NOT NULL DEFAULT 0,
	`expires_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `referral_codes_id` PRIMARY KEY(`id`),
	CONSTRAINT `referral_codes_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `referral_tracking` (
	`id` int AUTO_INCREMENT NOT NULL,
	`referral_code` varchar(50) NOT NULL,
	`referred_email` varchar(320) NOT NULL,
	`referred_purchase_id` int,
	`reward_code` varchar(50),
	`reward_sent` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `referral_tracking_id` PRIMARY KEY(`id`)
);
