CREATE TABLE `book_purchases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`stripe_payment_intent_id` varchar(255) NOT NULL,
	`customer_email` varchar(320) NOT NULL,
	`customer_name` varchar(255),
	`amount_paid` int NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'usd',
	`purchased_at` timestamp NOT NULL DEFAULT (now()),
	`download_count` int NOT NULL DEFAULT 0,
	`last_downloaded_at` timestamp,
	CONSTRAINT `book_purchases_id` PRIMARY KEY(`id`),
	CONSTRAINT `book_purchases_stripe_payment_intent_id_unique` UNIQUE(`stripe_payment_intent_id`)
);
