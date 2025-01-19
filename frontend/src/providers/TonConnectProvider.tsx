// src/providers/TonConnectProvider.tsx
import { FC, PropsWithChildren } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

export const TonConnectProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/ton-connect/demo-telegram-bot/refs/heads/master/tonconnect-manifest.json">
            {children}
        </TonConnectUIProvider>
    );
};
