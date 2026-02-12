

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id="logoGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        {/* Background Shape (Squircle) */}
        <rect x="5" y="5" width="90" height="90" rx="25" fill="url(#logoGradient)" filter="url(#glow)" fillOpacity="0.2" />
        <rect x="10" y="10" width="80" height="80" rx="20" fill="url(#logoGradient)" />

        {/* Abstract Car / Shield Icon */}
        <path
            d="M30 55 L35 40 L65 40 L70 55 M25 55 L75 55 L75 70 Q75 75 70 75 L30 75 Q25 75 25 70 Z"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
        <circle cx="35" cy="75" r="5" fill="white" />
        <circle cx="65" cy="75" r="5" fill="white" />

        {/* Lightning Bolt (Speed/Power) */}
        <path
            d="M55 20 L45 45 L58 45 L48 70"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.9"
        />
    </svg>
);
