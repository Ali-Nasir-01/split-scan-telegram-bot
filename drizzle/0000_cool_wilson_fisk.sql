CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`telegram_id` varchar(50) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_telegram_id_unique` UNIQUE(`telegram_id`)
);
--> statement-breakpoint
CREATE TABLE `friends` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`telegram_id` varchar(50),
	`user_id` int NOT NULL,
	CONSTRAINT `friends_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `friends` ADD CONSTRAINT `friends_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;