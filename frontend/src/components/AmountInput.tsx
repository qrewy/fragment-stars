// src/components/AmountInput.tsx
import { FC } from 'react';

interface AmountInputProps {
    amount: string;
    setAmount: (value: string) => void;
    amountError: string;
    onSubmit: () => void;
}

export const AmountInput: FC<AmountInputProps> = ({
                                                      amount,
                                                      setAmount,
                                                      amountError,
                                                      onSubmit
                                                  }) => {
    return (
        <div className="input-group">
            <label>Choose quantity of Telegram Stars</label>
            <input
                type="number"
                min="50"
                max="1000000"
                placeholder="Enter amount from 50 to 1,000,000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit();
                    }
                }}
                onBlur={onSubmit}
                className={amountError ? 'input-error' : ''}
                style={amountError ? { backgroundColor: '#ff586333', border: '1px solid #ff5863' } : {}}
            />
        </div>
    );
};
