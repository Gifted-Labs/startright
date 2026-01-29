import { useState, useEffect } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownTimerProps {
    targetDate: Date | string;
    className?: string;
}

export const CountdownTimer = ({ targetDate, className = '' }: CountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const dateStr = typeof targetDate === 'string' && !targetDate.includes('T')
                ? `${targetDate}T00:00:00`
                : targetDate;
            const target = new Date(dateStr).getTime();
            const now = new Date().getTime();
            const difference = target - now;

            if (difference <= 0) {
                setIsExpired(true);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000)
            };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (isExpired) {
        return (
            <div className={`text-center ${className}`}>
                <p className="text-primary-400 font-bold text-lg uppercase tracking-wider">Event is Live!</p>
            </div>
        );
    }

    const TimeBlock = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center mx-2">
            <div className="bg-dark-900/80 backdrop-blur-md border border-white/5 rounded-lg px-3 py-4 min-w-[60px] md:min-w-[70px] flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                {/* Red accent line/glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 to-primary-400 opacity-80"></div>

                <span className="text-2xl md:text-3xl font-bold text-white tabular-nums z-10">
                    {value.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] text-primary-500 mt-1 uppercase tracking-wider font-semibold z-10">{label}</span>

                {/* Subtle sheen */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            </div>
        </div>
    );

    return (
        <div className={`flex items-center justify-center gap-3 md:gap-6 ${className}`}>
            <TimeBlock value={timeLeft.days} label="Days" />
            <span className="text-2xl md:text-4xl font-bold text-white/50 self-start mt-3">:</span>
            <TimeBlock value={timeLeft.hours} label="Hours" />
            <span className="text-2xl md:text-4xl font-bold text-white/50 self-start mt-3">:</span>
            <TimeBlock value={timeLeft.minutes} label="Minutes" />
            <span className="text-2xl md:text-4xl font-bold text-white/50 self-start mt-3">:</span>
            <TimeBlock value={timeLeft.seconds} label="Seconds" />
        </div>
    );
};
