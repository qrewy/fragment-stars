// src/hooks/useAmount.ts
import { useState, useCallback } from 'react';

export function useAmount() {
    const [amount, setAmount] = useState<string>('');
    const [amountError, setAmountError] = useState<string>('');
    const [previousAmount, setPreviousAmount] = useState<string>('');

    const validateAmount = useCallback(() => {
        const numericValue = parseInt(amount, 10);
        if (amount.trim() !== '') {


            if (isNaN(numericValue) || numericValue < 50) {
                setAmountError('You can buy a minimum of 50 stars.');
                return false;
            }
            if (numericValue > 1000000) {
                setAmountError('You can buy up to 1,000,000 stars.');
                return false;
            }
            setAmountError('');
            return true;
        }
    }, [amount]);

    const handleAmountSubmit = useCallback(() => {
        if (!validateAmount()) return;
        if (amount === previousAmount) {
            console.log('Amount has not changed, function will not be called.');
            return;
        }
        console.log(`Function called with amount: ${amount}`);
        setPreviousAmount(amount);
        setAmountError('');
    }, [validateAmount, amount, previousAmount]);

    return {
        amount,
        setAmount,
        amountError,
        handleAmountSubmit
    };
}
