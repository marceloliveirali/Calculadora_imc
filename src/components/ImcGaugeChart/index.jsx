import React from 'react';
import './imcGaugeChart.scss';
import { describeArc } from '../utils/svgUtils';

const ImcGaugeChart = ({ imc }) => {
    // Mapeia o IMC (0 a 35) para um ângulo (0 a 180 graus)
    const angle = Math.min(Math.max((imc / 35) * 180, 0), 180);

    return (
        <div className="gauge-wrapper">
            <svg viewBox="0 0 200 120">
                {/* Arcos das Categorias */}
                <path d={describeArc(100, 100, 80, 0, 45)} stroke="#00adef" fill="transparent" strokeWidth="20" />
                <path d={describeArc(100, 100, 80, 45, 105)} stroke="#8cc63f" fill="transparent" strokeWidth="20" />
                <path d={describeArc(100, 100, 80, 105, 150)} stroke="#f7941e" fill="transparent" strokeWidth="20" />
                <path d={describeArc(100, 100, 80, 150, 180)} stroke="#ed1c24" fill="transparent" strokeWidth="20" />

                {/* Ponteiro */}
                <line
                    x1="100" y1="100"
                    x2={100 + 70 * Math.cos(((angle - 180) * Math.PI) / 180)}
                    y2={100 + 70 * Math.sin(((angle - 180) * Math.PI) / 180)}
                    stroke="#333" strokeWidth="4" strokeLinecap="round"
                />
                <circle cx="100" cy="100" r="8" fill="#ff6b6b" />
            </svg>
        </div>
    );
};

export default ImcGaugeChart;




























