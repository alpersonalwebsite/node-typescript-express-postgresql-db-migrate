ALTER TABLE users ADD COLUMN username VARCHAR;
UPDATE users SET username = False WHERE username IS NULL;
ALTER TABLE users ALTER COLUMN username  DROP NOT NULL;