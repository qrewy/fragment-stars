// src/components/RecipientInput.tsx
import { FC } from 'react';
import '../assets/styles/App.css';

interface RecipientInputProps {
    username: string;
    setUsername: (value: string) => void;
    usernameError: string;
    onSubmit: () => void;
}

export const RecipientInput: FC<RecipientInputProps> = ({
                                                            username,
                                                            setUsername,
                                                            usernameError,
                                                            onSubmit
                                                        }) => {
    return (
        <div className="input-group">
            <label>Choose recipient</label>
            <input
                type="text"
                placeholder="Enter Telegram username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit();
                    }
                }}
                onBlur={onSubmit}
                className={usernameError ? 'input-error' : ''}
                style={usernameError ? { backgroundColor: '#ff586333', border: '1px solid #ff5863' } : {}}
            />
            {/* Remove the error text paragraph or leave it empty if desired */}
        </div>
    );
};
