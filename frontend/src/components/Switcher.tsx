import React from "react";
import "../assets/styles/Switcher.css";

interface SwitcherProps {
    selected: "Stars" | "Premium";
    setSelected: (option: "Stars" | "Premium") => void;
}

export const Switcher: React.FC<SwitcherProps> = ({ selected, setSelected }) => {
    return (
        <div className="switcher">
            <button
                className={selected === "Stars" ? "active" : ""}
                onClick={() => setSelected("Stars")}
            >
                Stars
            </button>
            <button
                className={selected === "Premium" ? "active" : ""}
                onClick={() => setSelected("Premium")}
            >
                Premium
            </button>
        </div>
    );
};
