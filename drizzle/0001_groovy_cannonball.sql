CREATE TABLE `newsletter_subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`source` varchar(100),
	`subscribed_at` timestamp NOT NULL DEFAULT (now()),
	`unsubscribed_at` timestamp,
	`unsubscribe_token` varchar(64),
	CONSTRAINT `newsletter_subscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletter_subscriptions_email_unique` UNIQUE(`email`),
	CONSTRAINT `newsletter_subscriptions_unsubscribe_token_unique` UNIQUE(`unsubscribe_token`)
);
--> statement-breakpoint
CREATE TABLE `waitlist_signups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`platform` enum('ios','android','both') NOT NULL,
	`newsletter_optin` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`confirmed_at` timestamp,
	`confirmation_token` varchar(64),
	CONSTRAINT `waitlist_signups_id` PRIMARY KEY(`id`),
	CONSTRAINT `waitlist_signups_email_unique` UNIQUE(`email`),
	CONSTRAINT `waitlist_signups_confirmation_token_unique` UNIQUE(`confirmation_token`)
);
