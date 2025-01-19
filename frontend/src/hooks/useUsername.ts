// src/hooks/useUsername.ts
import { useState, useCallback } from 'react';
import { fetchRecipientByUsername } from '../api';

export interface User {
    recipient?: string;
}

export function useUsername() {
    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [previousUsername, setPreviousUsername] = useState<string>('');
    const [user, setUser] = useState<User>({});

    const validateUsername = useCallback((): boolean => {
        if (username.trim() === '') {
            setUsernameError('Recipient username cannot be empty.');
            return false;
        }
        setUsernameError('');
        return true;
    }, [username]);

    const handleUsernameSubmit = useCallback(async () => {
        if (username.trim() !== '') {
            if (!validateUsername()) return;

            if (username === previousUsername) {
                console.log('Recipient has not changed, function will not be called.');
                return;
            }

            try {
                const data = await fetchRecipientByUsername(username);
                if (data?.error) {
                    setUsernameError('Recipient not found.');
                    return;
                }
                console.log(data.found.name);
                setUser({recipient: data.found.recipient});
                setPreviousUsername(username);
                setUsernameError('');
            } catch (error) {
                console.error('Error fetching username:', error);
                setUsernameError('Error fetching username.');
            }
        }
    }, [username, previousUsername, validateUsername]);

    return {
        username,
        setUsername,
        usernameError,
        user,
        handleUsernameSubmit
    };
}
