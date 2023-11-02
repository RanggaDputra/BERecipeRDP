-- Active: 1693379950946@@147.139.210.135@5432@rangga01

CREATE TABLE
    recipe(
        id SERIAL,
        title VARCHAR NOT NULL,
        ingredients TEXT NOT NULL,
        category VARCHAR NOT NULL,
        photo VARCHAR NOT NULL
    )



INSERT INTO
    recipe(
        title,
        ingredients,
        category,
        photo
    )
VALUES
(
        'telur gulung',
        'telur, msg, bihun, saus',
        'appetizer',
        'https://placehold.co/600x400'
    );

   ALTER TABLE recipe DROP COLUMN category;

   CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

INSERT INTO category(name) VALUES('main course');
INSERT INTO category(name) VALUES('desert');
INSERT INTO category(name) VALUES('appetizer');

ALTER TABLE recipe ADD COLUMN category_id INT;

UPDATE recipe SET category_id=1 WHERE photo='https://placehold.co/600x400';

ALTER TABLE users ALTER COLUMN category_id SET NOT NULL;

ALTER TABLE recipe ADD FOREIGN KEY (category_id) REFERENCES category(id);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users(username,email,password) VALUES('admin','admin@admin.id','123456');
INSERT INTO users(username,email,password) VALUES('guest','guest@admin.id','123456');

INSERT INTO users(name,email) VALUES('Rangga','rangga@yahoo.com');

ALTER TABLE recipe ADD COLUMN users_id INT;
ALTER TABLE users ADD COLUMN password VARCHAR NOT NULL;

UPDATE recipe SET users_id=2 WHERE photo='https://placehold.co/600x400';

ALTER TABLE recipe ALTER COLUMN users_id SET NOT NULL;

ALTER TABLE recipe ADD FOREIGN KEY (users_id) REFERENCES users(id);

UPDATE users SET password='$argon2id$v=19$m=65536,t=3,p=4$7WPNW/O08arH1vs1tVG++w$cgfqZCfmZ29bgQmb2oN1zLHi0BtpaDqXp8IL6jd0GUY' WHERE email='guest@admin.id';
UPDATE users SET role='users' WHERE id=2;

ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN checker VARCHAR;
SELECT recipe.id, recipe.title, recipe.ingredients, recipe.photo, category.name AS category, users.username AS creator
FROM recipe
JOIN category ON recipe.category_id = category.id
JOIN users ON recipe.users_id = users.id
ORDER BY recipe.id;

ALTER TABLE recipe
ADD CONSTRAINT id PRIMARY KEY (id);

CREATE TABLE liked (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE
);
CREATE TABLE bookmarked (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE
);

CREATE TABLE comment (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE
);
