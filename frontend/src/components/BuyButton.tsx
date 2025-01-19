// src/components/BuyButton.tsx
import { FC } from 'react';
interface BuyButtonProps {
    disabled: boolean;
    amount: number;
    onClick: () => void;
}

export const BuyButton: FC<BuyButtonProps> = ({ disabled, amount, onClick }) => {
    return (
        <button className="buy-button" onClick={onClick} disabled={disabled}>
         <span>Buy {amount == 0 ? '' : amount} stars</span>
        </button>
    );
};
