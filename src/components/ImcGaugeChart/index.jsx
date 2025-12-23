import React from 'react';
import './imcGaugeChart.scss';
import { describeArc } from '../utils/svgUtils';

const ranges = [
    { min: 0, max: 18.5, color: '#00adef', label: 'Baixo peso' },
    { min: 18.5, max: 25, color: '#8cc63f', label: 'Peso normal' },
    { min: 25, max: 30, color: '#f7941e', label: 'Sobrepeso' },
    { min: 30, max: 35, color: '#ed1c24', label: 'Obesidade I' },
    { min: 35, max: 40, color: '#b71c1c', label: 'Obesidade II' },
    { min: 40, max: 50, color: '#6d0019', label: 'Obesidade III' },
];

function getClassification(imc)
{
    if (imc < 18.5) return 'Baixo peso';
    if (imc < 25) return 'Peso normal (eutrofia)';
    if (imc < 30) return 'Sobrepeso';
    if (imc < 35) return 'Obesidade Grau I';
    if (imc < 40) return 'Obesidade Grau II';
    return 'Obesidade Grau III (Mórbida/Grave)';
}

function getClassificationColor(imc)
{
    if (imc < 18.5) return '#00adef';
    if (imc < 25) return '#8cc63f';
    if (imc < 30) return '#f7941e';
    if (imc < 35) return '#ed1c24';
    if (imc < 40) return '#b71c1c';
    return '#6d0019';
}

function ImcGaugeChart({ imc })
{
    // Mapeia o IMC (0 a 40) para um ângulo (0 a 180 graus)
    const angle = Math.min(Math.max((imc / 40) * 180, 0), 180);

    // Marcas para os valores
    const marks = [0, 18.5, 25, 30, 35, 40];

    return (
        <div className="gauge-wrapper">
            <svg viewBox="0 0 200 120">
                {/* Arcos das Categorias */}
                {ranges.map((range, i) => {
                    const startAngle = (range.min / 40) * 180;
                    const endAngle = (range.max / 40) * 180;
                    return (
                        <path
                            key={i}
                            d={describeArc(100, 100, 80, startAngle, endAngle)}
                            stroke={range.color}
                            fill="transparent"
                            strokeWidth="20"
                        />
                    );
                })}

                {/* Ponteiro */}
                <line
                    x1="100" y1="100"
                    x2={100 + 70 * Math.cos(((angle - 180) * Math.PI) / 180)}
                    y2={100 + 70 * Math.sin(((angle - 180) * Math.PI) / 180)}
                    stroke="#333" strokeWidth="6" strokeLinecap="round"
                />
                <circle cx="100" cy="100" r="14" fill="#ff6b6b" stroke="#fff" strokeWidth="4" />

                {/* Marcas dos valores */}
                {marks.map((mark, i) => {
                    const a = (mark / 40) * 180 - 180;
                    const x = 100 + 90 * Math.cos((a * Math.PI) / 180);
                    const y = 100 + 90 * Math.sin((a * Math.PI) / 180);
                    return (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fontSize="13"
                            fill="#888"
                            fontWeight="bold"
                        >
                            {mark}
                        </text>
                    );
                })}
            </svg>
            <div className="imc-value" style={{ color: getClassificationColor(imc) }}>
                {imc.toFixed(1)}
            </div>
            <div className="imc-classification" style={{ color: getClassificationColor(imc) }}>
                Classificação: {getClassification(imc)}
            </div>
            <div className="imc-legend">
                <div><span className="legend-color" style={{ background: '#00adef' }} /> Baixo peso</div>
                <div><span className="legend-color" style={{ background: '#8cc63f' }} /> Peso normal</div>
                <div><span className="legend-color" style={{ background: '#f7941e' }} /> Sobrepeso</div>
                <div><span className="legend-color" style={{ background: '#ed1c24' }} /> Obesidade I</div>
                <div><span className="legend-color" style={{ background: '#b71c1c' }} /> Obesidade II</div>
                <div><span className="legend-color" style={{ background: '#6d0019' }} /> Obesidade III</div>
            </div>
        </div>
    );
};

export default ImcGaugeChart;




























