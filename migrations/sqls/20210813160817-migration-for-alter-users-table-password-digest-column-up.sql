ALTER TABLE users ADD COLUMN password_digest VARCHAR;
UPDATE users SET password_digest = False WHERE password_digest IS NULL;
ALTER TABLE users ALTER COLUMN password_digest  DROP NOT NULL;