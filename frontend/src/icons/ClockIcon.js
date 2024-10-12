import React from "react";

function ClockIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <defs>
                <linearGradient id="gradient2" gradientTransform="rotate(25)">
                    <stop offset="0%" stopColor="#7dd3fc" />
                    <stop offset="100%" stopColor="#f0abfc" />
                </linearGradient>
            </defs>
            <path
                stroke="url(#gradient2)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 7v5l-2.5 1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
        </svg>
    );
}

export default ClockIcon;