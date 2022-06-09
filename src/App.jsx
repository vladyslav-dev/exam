import { useState, useRef, useEffect } from 'react';
import './styles/index.css';

const SUCCESSIVELY = 'SUCCESSIVELY'
const PARALLEL = 'PARALLEL'

const validateInput = (value) => {
  return /^[0-9+-.\/]*$/.test(value);
}

const App = () => {


  const canvasRef = useRef(null);

  const [R1, setR1] = useState(2);
  const [R2, setR2] = useState(2);

  const [calcResult, setCalcResult] = useState(null);

  const [calcType, setCalcType] = useState(null); // SUCCESSIVELY or PARALLEL

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      canvas.width = canvas.parentElement.scrollWidth;
      canvas.height = canvas.parentElement.scrollHeight;

      const posX = 120;
      const posY = 150;

      const rectWidth = 60;
      const rectHeight = 20;

      ctx.beginPath();

      ctx.moveTo(0, posY);
      ctx.lineTo(posX, posY);
      ctx.stroke()

      ctx.closePath();

      ctx.strokeRect(posX, (posY - (rectHeight / 2)), rectWidth, rectHeight);

      ctx.beginPath();

      ctx.moveTo(posX + rectWidth, posY);
      ctx.lineTo((posX * 2) + rectWidth, posY);
      ctx.stroke()

      ctx.closePath();

      ctx.strokeRect((posX * 2) + rectWidth, (posY - (rectHeight / 2)), rectWidth, rectHeight);

      ctx.beginPath();

      ctx.moveTo((posX * 2) + (rectWidth * 2), posY);
      ctx.lineTo((posX * 3) + (rectWidth * 2), posY);
      ctx.stroke()

      ctx.closePath();
    }




  }, [calcResult])

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
            <div className='canvasWrapper'>
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>
        </div>
      )}

      <button onClick={handleSubmit} disabled={calcType === null}>Calc</button>
    </div>
  );
}

export default App;
