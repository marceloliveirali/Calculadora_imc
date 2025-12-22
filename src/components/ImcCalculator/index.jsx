import React, { useState, useEffect } from 'react';
import AnalogClock from '../AnalogClock';
import ImcGaugeChart from '../ImcGaugeChart';
import './ImcCalculator.scss';

const ImcCalculator = () => {
    const [altura, setAltura] = useState(180);
    const [peso, setPeso] = useState(70);
    const [genero, setGenero] = useState('homem');
    const [imc, setImc] = useState(0);

    useEffect(() => {
        const alturaMetros = altura / 100;
        if (alturaMetros > 0) {
            const calculo = (peso / (alturaMetros * alturaMetros)).toFixed(1);
            setImc(parseFloat(calculo));
        }
    }, [altura, peso]);

    const getClassificacao = () => {
        if (imc < 18.5) return { text: 'Abaixo do Peso', color: '#00adef' };
        if (imc < 25) return { text: 'Peso Normal', color: '#8cc63f' };
        if (imc < 30) return { text: 'Sobrepeso', color: '#f7941e' };
        return { text: 'Obesidade', color: '#ed1c24' };
    };

    const info = getClassificacao();

    return (
        <div className="card">
            <header>
                <h1>Calculadora de IMC</h1>
                <AnalogClock />
            </header>

            <div className="inputs-grid">
                <div className="input-group">
                    <label>Altura</label>
                    <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} />
                    <span>cm</span>
                </div>
                <div className="input-group">
                    <label>Peso</label>
                    <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />
                    <span>kg</span>
                </div>
            </div>

            <div className="gender-age-row">
                <div className="gender-toggle">
                    <button className={genero === 'homem' ? 'active' : ''} onClick={() => setGenero('homem')}>♂ Homem</button>
                    <button className={genero === 'mulher' ? 'active' : ''} onClick={() => setGenero('mulher')}>♀ Mulher</button>
                </div>
                <div className="age-input">
                    <label>Idade</label>
                    <input type="number" defaultValue="30" />
                </div>
            </div>

            <ImcGaugeChart imc={imc} />

            <div className="result-section">
                <h2 className="imc-value">{imc}</h2>
                <p className="imc-class" style={{ color: info.color }}>Classificação: {info.text}</p>
            </div>

            <footer className="legend">
                <span><i style={{background: '#00adef'}}></i> Abaixo</span>
                <span><i style={{background: '#8cc63f'}}></i> Normal</span>
                <span><i style={{background: '#f7941e'}}></i> Sobrepeso</span>
                <span><i style={{background: '#ed1c24'}}></i> Obesidade</span>
            </footer>
        </div>
    );
};

export default ImcCalculator;
