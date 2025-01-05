export const KudosCoin = ({ size = 200 , text="0"}) => {
    return (
        <svg
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
        >
            {/* Outer Coin Circle */}
            <circle cx="100" cy="100" r="90" fill="#FFD700" stroke="#E5A100" strokeWidth="5" />

            {/* Inner Gradient */}
            <defs>
                <radialGradient id="coin_grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#FFF38E" />
                    <stop offset="100%" stopColor="#FFD700" />
                </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="85" fill="url(#coin_grad)" />

            {/* Decorative Rings */}
            <circle cx="100" cy="100" r="70" fill="none" stroke="#E5A100" strokeWidth="4" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#F6C700" strokeWidth="2" />

            {/* Letter K (Embossed Effect) */}
            <text
                x="100"
                y="115"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="90"
                fontFamily="Arial"
                fill="#4A2900"
                fontWeight="bold"
                stroke="#E5A100"
                strokeWidth="2"
            >
                {text}
            </text>
        </svg>
    );
};
