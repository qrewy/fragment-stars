import React from "react";
import "../assets/styles/SubscriptionDuration.css";

interface SubscriptionDurationProps {
    selected: "1 year" | "6 months" | "3 months";
    setSelected: (option: "1 year" | "6 months" | "3 months") => void;
}

export const SubscriptionDuration: React.FC<SubscriptionDurationProps> = ({ selected, setSelected }) => {
    return (
        <div className="subscription-container">
            <span className="subscription-title">Duration</span>
            <div className="subscription-options">
                <button
                    className={selected === "1 year" ? "active" : ""}
                    onClick={() => setSelected("1 year")}
                >
                    1 year <br /> <span className="price">$28.99</span>
                </button>
                <button
                    className={selected === "6 months" ? "active" : ""}
                    onClick={() => setSelected("6 months")}
                >
                    6 months <br /> <span className="price">$15.99</span>
                </button>
                <button
                    className={selected === "3 months" ? "active" : ""}
                    onClick={() => setSelected("3 months")}
                >
                    3 months <br /> <span className="price">$11.99</span>
                </button>
            </div>
        </div>
    );
};
