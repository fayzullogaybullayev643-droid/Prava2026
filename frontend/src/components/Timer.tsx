import React, { useEffect, useState } from 'react';

interface TimerProps {
    initialMinutes?: number;
    onTimeUp: () => void;
    isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ initialMinutes = 20, onTimeUp, isActive }) => {
    const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);

    useEffect(() => {
        if (!isActive || secondsLeft <= 0) return;

        const intervalId = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isActive, secondsLeft, onTimeUp]);

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`text-2xl font-bold font-mono p-4 rounded-lg shadow-sm border ${secondsLeft < 60 ? 'bg-red-50 text-red-600 border-red-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
            {formatTime(secondsLeft)}
        </div>
    );
};
