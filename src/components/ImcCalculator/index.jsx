import React, { useState, useEffect } from 'react';
import AnalogClock from '../AnalogClock';
import ImcGaugeChart from '../ImcGaugeChart';
import './ImcCalculator.scss';

function ImcCalculator()
{
    const [altura, setAltura] = useState(180);
    const [peso, setPeso] = useState(70);
    const [genero, setGenero] = useState('homem');
    const [imc, setImc] = useState(0);

    useEffect(() => {
        const alturaMetros = altura / 100;

        if (alturaMetros > 0)
        {
            const calculo = (peso / (alturaMetros * alturaMetros)).toFixed(1);
            setImc(parseFloat(calculo));
        }
    }, [altura, peso]);

    return (
        <div className="card">
            <header>
                <h1>
                    Calculadora de IMC
                    <h5>Para adultos de 18 a 59 anos</h5>
                </h1>
                <AnalogClock />
            </header>

            <div className="inputs-row">
                <div className="input-box">
                    <label>Altura</label>
                    <div className="input-btn">
                        <input
                            type="number"
                            value={altura}
                            onChange={e => setAltura(Number(e.target.value))}
                        />
                        <span>cm</span>
                    </div>
                </div>
                <div className="input-box">
                    <label>Peso</label>
                    <div className="input-btn">
                        <input
                            type="number"
                            value={peso}
                            onChange={e => setPeso(Number(e.target.value))}
                        />
                        <span>kg</span>
                    </div>
                </div>
            </div>

            <div className="gender-age-row">
                <div className="gender-toggle">
                    <button
                        className={genero === 'homem' ? 'active' : ''}
                        onClick={() => setGenero('homem')}
                    >♂ Homem</button>
                    <button
                        className={genero === 'mulher' ? 'active' : ''}
                        onClick={() => setGenero('mulher')}
                    >♀ Mulher</button>
                </div>
            </div>

            <ImcGaugeChart imc={imc} />
        </div>
    );
}

export default ImcCalculator;
