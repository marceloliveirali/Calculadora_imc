import React from 'react';
import { getCoords, describeArc } from '../utils/svgUtils';
import './imcGaugeChart.scss';

// Constantes do gráfico
const MAX_IMC_GAUGE = 50;
const START_ANGLE = -135;
const END_ANGLE = 135;
const TOTAL_ARC_ANGLE = END_ANGLE - START_ANGLE;
const RADIUS = 90;
const ARC_WIDTH = 20;

// Faixas de IMC
const IMC_RANGES = [
    { min: 0, max: 18.5, color: '#00BFFF', label: 'Abaixo do Peso' },
    { min: 18.5, max: 24.9, color: '#32CD32', label: 'Peso Normal' },
    { min: 25, max: 29.9, color: '#FFA500', label: 'Sobrepeso' },
    { min: 30, max: MAX_IMC_GAUGE, color: '#FF4500', label: 'Obesidade' },
];

// IMC -> Ângulo
function imcToAngle(value)
{
    const safeValue = Math.min(Math.max(value, 0), MAX_IMC_GAUGE);
    const percentage = safeValue / MAX_IMC_GAUGE;
    return START_ANGLE + percentage * TOTAL_ARC_ANGLE;
}

//Rotação  do ponteiro
function calculatePointerRotation(imc)
{
    return imcToAngle(imc);
}

function imcGaugeChart( { imc } )
{
    const rotation = calculatePointerRotation(parseFloat(imc));
    const pointerEnd = getCoords(rotation, RADIUS - 25);

    return (
        <>
            <div className="gauge-container">
                <svg viewBox="0 0 200 120" className="gauge-svg">

                    {/* 1- Arcos de IMC */}
                    {IMC_RANGES.map((range, index) => (
                        <path
                            key={index}
                            d={describeArc(
                                imcToAngle(range.min),
                                imcToAngle(range.max),
                                RADIUS,
                                ARC_WIDTH
                            )}
                            fill={range.color}
                        />
                    ))}

                    {/* 2- Ponteiro */}
                    <g
                        className="pointer-group"
                        style={{ transform: `rotate(${rotation}deg)` }}
                        transform-origin="100 100"
                    >
                        {/* Linha do ponteiro */}
                        <line
                            x1="100"
                            y1="100"
                            x2={pointerEnd.x}
                            y2={pointerEnd.y}
                            stroke="#333"
                            strokeWidth="3"
                        />

                        {/* Círculo central */}
                        <circle
                            cx="100"
                            cy="100"
                            r="5"
                            fill="#333"
                        />
                    </g>

                    {/* Texto do IMC */}
                    <text
                        x="100"
                        y="115"
                        textAnchor="middle"
                        className="imc-value"
                    >
                        IMC: {imc}
                    </text>

                </svg>

                {/* 3- Legenda */}
                <div className="gauge-legend">
                    {IMC_RANGES.map((range, index) => (
                        <div key={index} className="legend-item">
                            <span
                                className="legend-color"
                                style={{ backgroundColor: range.color }}
                            />
                            <span className="legend-label">
                                {range.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default imcGaugeChart;
























