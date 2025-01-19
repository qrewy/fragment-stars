// src/components/BuyButton.tsx
import { FC } from 'react';

interface DisconnectProps {
    onClick: () => void;
}

export const DisconnectButton: FC<DisconnectProps> = ({ onClick }) => {
    return (
        <button className="disconnect-button" onClick={onClick} >
            Disconnect Wallet
        </button>
    );
};
