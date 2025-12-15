import React, {useState} from "react";
import { describeArc } from "../utils/svgUtils.js";
import './imcGaugeChart.scss';

// Constatntes do gráfico de medidor
const MAX_IMC_GAUGE = 50;
const START_ANGLE = -135;
const END_ANGLE = 135;
const TOTAL_ARC_ANGLE = END_ANGLE - START_ANGLE;
const RADIUS = 90;
const ARC_WIDTH = 20;

// Faixas de IMC e Cores
const lowWeightColour = '#00BFFF';
const normalWeightColour = '#32CD32';
const overWeightColour = '#FFA500';
const obesityColour = '#FF4500';

const IMC_RANGES = [
    { min: 0, max: 18.5, colour: lowWeightColour, label: 'Abaixo do Peso' },
    { min: 18.6, max: 24.9, colour: normalWeightColour, label: 'Peso Normal' },
    { min: 25, max: 29.9, colour: overWeightColour, label: 'Sobrepeso' },
    { min: 30, max: MAX_IMC_GAUGE, colour: obesityColour, label: 'Obesidade' }
];

// Função: tranformando o IMC em um ângulo
function imcToAngle(value)
{
    // Limita o valor dentro do intervalo válido
    const safeValue = Math.min(Math.max(value, 0), MAX_IMC_GAUGE);
    const percentage = safeValue / MAX_IMC_GAUGE;
    return START_ANGLE + percentage * TOTAL_ARC_ANGLE;
}

// Função do ponteiro
function calculatePointerRotation(imc)
{
    const safeImc = Math.min(Math.max(imc, 0), MAX_IMC_GAUGE);
    const percentage = safeImc / MAX_IMC_GAUGE;
    return START_ANGLE + (percentage * TOTAL_ARC_ANGLE);
}

// Componente  principal
function imcGaugeChart( { imc } )
{
    let currentImc;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    [currentImc] = useState(parseFloat(imc));
    const rotation = calculatePointerRotation(currentImc);

    return (
        <div className="gauge-container">
            <svg viewBox="0 0 200 120" className="gauge-svg">

                {/* 1. Arcos das faixas de IMC */}
                {IMC_RANGES.map((range, index) => (
                    <path
                        key={index}
                        d={describeArc(
                            100,
                            100,
                            RADIUS,
                            ARC_WIDTH,
                            imcToAngle(range.min),
                            imcToAngle(range.max)
                        )}
                        fill={range.color}
                    />
                ))}

                {/* 2. Ponteiro */}
                <g
                    className="pointer-group"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    transform-origin="100 100"
                >
                    {/* linha do ponteiro */}
                    <line
                        x1="100"
                        y1="100"
                        x2="100"
                        y2="20"
                        stroke="black"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                    {/* circular central */}
                    <circle cx="100" cy="100" r="6" fill="black" />
                </g>
            </svg>

            {/* 3. Legend */}
            <div className="gauge-legend">
                {IMC_RANGES.map((range, i) => (
                    <div key={i} className="legend-item">
                        <span
                            className="legend-color"
                            style={{ backgroundColor: range.color }}
                        />
                        {range.label} ({range.min} – {range.max})
                    </div>
                ))}
            </div>
        </div>
    );
}

export default imcGaugeChart;