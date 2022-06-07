import { useState } from 'react';
import './styles/index.css';

const SUCCESSIVELY = 'SUCCESSIVELY'
const PARALLEL = 'PARALLEL'

const validateInput = (value) => {
  return /^[0-9+-.\/]*$/.test(value);
}

const App = () => {

  const [R1, setR1] = useState(0);
  const [R2, setR2] = useState(0);

  const [calcResult, setCalcResult] = useState(null);

  const [calcType, setCalcType] = useState(null); // SUCCESSIVELY or PARALLEL

  const handleSubmit = () => {

    const r1 = Number(R1);
    const r2 = Number(R2);

    if (validateInput(r1) && validateInput(r2)) {
      const calculateBy = {
        SUCCESSIVELY: () => {
          return r1 + r2;
        },
        PARALLEL: () => {
          return (r1 * r2) / (r1 + r2);
        }
      };

      const getResult = calculateBy[calcType];

      const result = getResult();
      console.log(result)

      if (isNaN(result) || !result) {
        alert('Please enter valid numbers');
      } else {
        setCalcResult(getResult())
      }
    } else {
      alert('Please enter valid numbers');
    }


  }

  const resetCalcResult = (event) => {
    setCalcResult(null);
  }

  return (
    <div className='wrapper'>
      <div>
        <h2>R1=</h2>
        <input
          type="text"
          value={R1}
          onChange={(event => {
            validateInput(event.target.value) && setR1(event.target.value)
          })}
        />
      </div>
      <div>
        <h2>R2=</h2>
        <input
          type="text"
          value={R2}
          onChange={(event => {
            validateInput(event.target.value) && setR2(event.target.value)
          })}
        />
      </div>
      <div>
        <h3>Calc Type:</h3>
        <div>
          <input
            type="radio"
            id={SUCCESSIVELY}
            name="calcTypeGroup"
            value={SUCCESSIVELY}
            onChange={(event) => setCalcType(event.target.value)}
          />
          <label htmlFor={SUCCESSIVELY}>Successively</label>
        </div>
        <div>
          <input
            type="radio"
            id={PARALLEL}
            name="calcTypeGroup"
            value={PARALLEL}
            onChange={(event) => setCalcType(event.target.value)}
          />
          <label htmlFor={PARALLEL}>Parallel</label>
        </div>

      </div>
      {calcResult !== null && (
        <div className='modal-background' onClick={resetCalcResult}>
          <div className='modal-box' onClick={(event) => event.stopPropagation()}>
            <button onClick={resetCalcResult}>&#10006;</button>
            <h2>Result: {calcResult}</h2>
          </div>
        </div>
      )}

      <button onClick={handleSubmit} disabled={calcType === null}>Calc</button>
    </div>
  );
}

export default App;
