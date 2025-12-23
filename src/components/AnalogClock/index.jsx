import React, { useEffect, useState } from 'react';
import './AnalogClock.scss';

function AnalogClock()
{
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours() % 12;

    return (
        <div className="analog-clock">
            {/* Marcações */}
            {[...Array(12)].map((_, i) => (
                <span
                    key={i}
                    className="mark"
                    style={{ transform: `rotate(${i * 30}deg)` }}
                />
            ))}

            {/* Ponteiros */}
            <div
                className="hand hour"
                style={{ transform: `rotate(${hours * 30 + minutes * 0.5}deg)` }}
            />
            <div
                className="hand minute"
                style={{ transform: `rotate(${minutes * 6}deg)` }}
            />
            <div
                className="hand second"
                style={{ transform: `rotate(${seconds * 6}deg)` }}
            />

            <div className="center-dot" />
        </div>
    );
}

export default AnalogClock;



















