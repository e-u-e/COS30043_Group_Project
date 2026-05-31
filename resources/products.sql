DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `category` VARCHAR(100) DEFAULT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `products` (`id`, `name`, `description`, `price`, `category`, `image`, `stock`, `rating`) VALUES
(1, 'Gaming Laptop', 'High performance gaming laptop.', 1499.00, 'Electronics', '/laptop.png', 25, 4.40),
(2, 'Wireless Headphones', 'Noise cancelling headphones.', 199.00, 'Electronics', '/wireless-headphones.png', 80, 4.30),
(3, 'Running Shoes', 'Comfortable running shoes.', 120.00, 'Shoes', '/running-shoes.png', 60, 4.20),
(4, 'Smart Watch', 'Track your fitness and health.', 350.00, 'Accessories', '/smart-watch.png', 45, 4.35),
(5, 'Bluetooth Speaker', 'Portable Bluetooth speaker.', 89.00, 'Electronics', '/wireless-speaker.png', 70, 4.15),
(6, 'Leather Wallet', 'Genuine leather wallet.', 45.00, 'Accessories', '/leather-wallet.webp', 150, 4.05),
(7, 'Sunglasses', 'Polarized sunglasses.', 75.00, 'Fashion', '/sunglasses.webp', 110, 4.10),
(8, 'Backpack', 'Durable travel backpack.', 110.00, 'Accessories', '/backpack.png', 95, 4.25),
(9, 'Fitness Band', 'Track activity and sleep.', 60.00, 'Accessories', '/fitness-tracker.webp', 130, 4.00),
(10, 'Electric Kettle', 'Fast boiling electric kettle.', 40.00, 'Home', '/kettle.png', 75, 4.05),
(11, 'Coffee Maker', 'Automatic drip coffee maker.', 129.00, 'Home', '/coffee-maker.png', 40, 4.20),
(12, 'Desk Lamp', 'LED desk lamp with dimmer.', 35.00, 'Home', '/desk-lamp.webp', 140, 4.00);

