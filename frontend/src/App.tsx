import './assets/styles/App.css';
import { useState, useEffect } from 'react';
import { useUsername } from './hooks/useUsername';
import { useAmount } from './hooks/useAmount';
import { RecipientInput } from './components/RecipientInput';
import { AmountInput } from './components/AmountInput';
import { BuyButton } from './components/BuyButton';
import { DisconnectButton } from './components/DisconnectButton';
import { TonConnectUIProvider, TonConnectButton, useTonWallet, useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { getTransaction } from "./api";
import starIcon from './assets/svg/star.svg'; // Import the SVG

function App() {
    return (
        <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/ton-connect/demo-telegram-bot/refs/heads/master/tonconnect-manifest.json">
            <InnerApp />
        </TonConnectUIProvider>
    );
}

function InnerApp() {
    const { username, setUsername, usernameError, handleUsernameSubmit, user } = useUsername();
    const { amount, setAmount, amountError, handleAmountSubmit } = useAmount();
    const [isConnected, setConnected] = useState<boolean>(false);
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();
    const rawAddress = useTonAddress(false);

    useEffect(() => {
        setConnected(!!wallet);
    }, [wallet]);

    const handleBuyStars = async (): Promise<void> => {
        if (!isConnected) {
            tonConnectUI.openModal();
        } else {
            const transaction = await getTransaction(rawAddress, user?.recipient ?? '', Number(amount));
            const messages = {
                validUntil: transaction.transaction.validUntil,
                messages: [transaction.transaction.message]
            };
            tonConnectUI.sendTransaction(messages);
        }
    };

    const DisconnectWallet = async (): Promise<void> => {
        await tonConnectUI.disconnect();
        setConnected(false);
    };

    const isBuyDisabled = !!usernameError || !!amountError || !username || !amount;

    return (
        <>
            {/* Updated Logo */}
            <div className="logo">
                <h1>
                    buy <span className="highlight">telegram stars</span>
                    <img src={starIcon} alt="Star Icon" className="star-icon" />
                </h1>
                <span className="subtitle">
                    without <span className="kyc">KYC</span>
                </span>
            </div>

            {/* Inputs */}
            <div className="inputs-container">
                <RecipientInput
                    username={username}
                    setUsername={setUsername}
                    usernameError={usernameError}
                    onSubmit={handleUsernameSubmit}
                />

                <AmountInput
                    amount={amount}
                    setAmount={setAmount}
                    amountError={amountError}
                    onSubmit={handleAmountSubmit}
                />

                <BuyButton disabled={isBuyDisabled} amount={Number(amount)} onClick={handleBuyStars} />

                {isConnected && <DisconnectButton onClick={DisconnectWallet} />}
            </div>

            {/* TonConnect Button - Hidden */}
            <TonConnectButton className="ton-connect" style={{ display: 'none' }} />
        </>
    );
}

export default App;
