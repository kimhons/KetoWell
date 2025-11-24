CREATE TABLE `email_sends` (
	`id` int AUTO_INCREMENT NOT NULL,
	`waitlist_signup_id` int NOT NULL,
	`email_type` enum('confirmation','day_1','day_3','day_7') NOT NULL,
	`sent_at` timestamp NOT NULL DEFAULT (now()),
	`status` enum('sent','failed','bounced') NOT NULL DEFAULT 'sent',
	`resend_message_id` varchar(100),
	`error_message` text,
	CONSTRAINT `email_sends_id` PRIMARY KEY(`id`)
);
