CREATE TABLE drink (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description varchar(70)
);

ALTER TABLE drink
ALTER COLUMN description TYPE VARCHAR(150);

INSERT INTO drink (name, price, description) VALUES
('Margarita', 12.50, 'A classic cocktail with tequila, lime juice, and orange liqueur.'),
('Mojito', 11.00, 'A Cuban highball with white rum, sugar, lime juice, soda water, and mint.'),
('Old Fashioned', 13.00, 'A cocktail made by muddling sugar with bitters, and then adding whiskey or brandy.'),
('Cosmopolitan', 11.50, 'A cocktail made with vodka, triple sec, cranberry juice, and fresh lime juice.'),
('Martini', 14.00, 'A classic cocktail made with gin and vermouth, and garnished with an olive or a lemon twist.'),
('Piña Colada', 10.50, 'A sweet cocktail made with rum, cream of coconut or coconut milk, and pineapple juice.'),
('Whiskey Sour', 12.00, 'A mixed drink containing whiskey, lemon juice, sugar, and an optional dash of egg white.'),
('Moscow Mule', 10.00, 'A buck or mule cocktail made with vodka, spicy ginger beer, and lime juice.'),
('Bloody Mary', 11.00, 'A cocktail containing vodka, tomato juice, and other spices and flavorings.'),
('Long Island Iced Tea', 15.00, 'A highball cocktail typically made with five liquors: vodka, tequila, light rum, triple sec, gin, and a splash of cola.'),
('Gin and Tonic', 9.50, 'A highball cocktail made with gin and tonic water poured over a large amount of ice.'),
('Espresso Martini', 13.50, 'A cold, coffee-flavored cocktail made with vodka, espresso coffee, and coffee liqueur.'),
('Daiquiri', 10.00, 'A family of cocktails whose main ingredients are rum, citrus juice (typically lime), and sugar or another sweetener.'),
('Manhattan', 14.50, 'A cocktail made with whiskey, sweet vermouth, and bitters.'),
('Tequila Sunrise', 10.50, 'A cocktail made of tequila, orange juice, and grenadine syrup.'),
('Sex on the Beach', 11.50, 'A cocktail with vodka, peach schnapps, orange juice, and cranberry juice.'),
('Mimosa', 8.00, 'A cocktail composed of sparkling wine and orange juice.'),
('Irish Coffee', 9.00, 'A cocktail consisting of hot coffee, Irish whiskey, and sugar, topped with thick cream.'),
('Screwdriver', 9.00, 'A simple cocktail made with vodka and orange juice.'),
('Godfather', 12.00, 'A cocktail made of Scotch whisky and amaretto liqueur.');

CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    status varchar(30)
);

CREATE TABLE order_item (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    drink_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    FOREIGN KEY (order_id) REFERENCES "order"(order_id) ON DELETE CASCADE,
    FOREIGN KEY (drink_id) REFERENCES drink(id) ON DELETE CASCADE
);

INSERT INTO "order" (client_name, status) VALUES
('Alex Johnson', 'completed'),
('Maria Rodriguez', 'pending'),
('David Chen', 'in-progress'),
('Sophia Lee', 'completed'),
('James Brown', 'pending'),
('Olivia Wilson', 'pending'),
('Daniel Kim', 'in-progress'),
('Chloe Davis', 'completed'),
('Noah Miller', 'pending'),
('Emily White', 'in-progress');

INSERT INTO order_item (order_id, drink_id, quantity) VALUES
(1, 1, 2),    -- Alex Johnson's order: 2 Margaritas
(1, 5, 1),    -- Alex Johnson's order: 1 Martini
(2, 2, 1),    -- Maria Rodriguez's order: 1 Mojito
(3, 3, 1),    -- David Chen's order: 1 Old Fashioned
(3, 6, 2),    -- David Chen's order: 2 Piña Coladas
(4, 4, 3),    -- Sophia Lee's order: 3 Cosmopolitans
(5, 7, 1),    -- James Brown's order: 1 Whiskey Sour
(5, 8, 1),    -- James Brown's order: 1 Moscow Mule
(6, 9, 2),    -- Olivia Wilson's order: 2 Bloody Marys
(7, 10, 1),   -- Daniel Kim's order: 1 Long Island Iced Tea
(8, 11, 2),   -- Chloe Davis's order: 2 Gin and Tonics
(8, 12, 1),   -- Chloe Davis's order: 1 Espresso Martini
(9, 1, 1),    -- Noah Miller's order: 1 Margarita
(10, 15, 1),  -- Emily White's order: 1 Tequila Sunrise
(10, 16, 1);  -- Emily White's order: 1 Sex on the Beach