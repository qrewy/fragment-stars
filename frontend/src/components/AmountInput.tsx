import { FC, useEffect, useState } from 'react';
import axios from 'axios';

interface AmountInputProps {
    amount: string;
    setAmount: (value: string) => void;
    amountError: string;
    onSubmit: () => void;
}

export const AmountInput: FC<AmountInputProps> = ({ amount, setAmount, amountError, onSubmit }) => {
    const [tonPrice, setTonPrice] = useState<number | null>(null);

    useEffect(() => {
        const fetchTonPrice = async () => {
            try {
                const res = await axios.get("https://tonapi.io/v2/rates?tokens=ton&currencies=usd");
                setTonPrice(res.data.rates["TON"].prices["USD"]);
            } catch (error) {
                console.error('Failed to fetch TON price', error);
            }
        };
        fetchTonPrice();
    }, []);

    return (
        <div className="input-group">
            <label>Choose quantity of Telegram Stars</label>
            <div style={{ position: 'relative' }}>
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
                {amount && Number(amount) > 49 && tonPrice && (
                    <p
                        style={{
                            position: 'absolute',
                            fontFamily: 'TT Interfaces',
                            top: '25%',
                            opacity: 0.5,
                            right: '10px',
                            transform: 'translateY(-50%)',
                            color: 'white',
                        }}
                    >
                        ~ {((Number(amount) * 0.015) / tonPrice).toFixed(2)} TON ({(Number(amount) * 0.015).toFixed(2)} $)
                    </p>
                )}
            </div>
        </div>
    );
};
