CREATE TABLE IF NOT EXISTS transactions(
    id UUID PRIMARY KEY  DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),  
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,    
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);