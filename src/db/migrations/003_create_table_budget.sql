CREATE TABLE IF NOT EXISTS budgets(
    id UUID PRIMARY KEY  DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT budgets_user_category_unique UNIQUE (user_id, category_id, start_date, end_date)
);