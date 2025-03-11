CREATE TABLE `block` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`start` text NOT NULL,
	`end` text NOT NULL,
	`session_id` integer NOT NULL,
	`date` text GENERATED ALWAYS AS (date("start")) VIRTUAL,
	`duration` real GENERATED ALWAYS AS ((julianday("end") - julianday("start")) * 24) VIRTUAL,
	FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `project` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`billingRate` real DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`desc` text NOT NULL,
	`status` text DEFAULT 'paused',
	`project_id` integer NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE cascade
);
