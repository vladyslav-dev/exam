import { useState } from 'react';
import './styles/index.css';

// Matrix 3 x 3 important
const initMatrix = (defaultValue) => {
  return Array.from(Array(3), () => new Array(3).fill(defaultValue));
}

// validate input function
const validateInput = (value) => {
  return /^[0-9+-.\/]*$/.test(value);
}

const Matrix = ({
  disabled = false,
  matrix,
  changeHandler = () => {},
}) => (
  <div className='matrix'>
    {matrix.map((row, rowIndex) => (
      <div className='row' key={rowIndex}>
        {row.map((cell, cellIndex) => (
          <div className='cell' key={`${rowIndex}-${cellIndex}`}>
            <input
              type="text"
              value={cell}
              disabled={disabled}
              onChange={(event => changeHandler(event, rowIndex, cellIndex))}
            />
          </div>
        ))}
      </div>
    ))}
  </div>
)

const App = () => {

  const [matrixA, setMatrixA] = useState(() => initMatrix('2'));
  const [matrixB, setMatrixB] = useState(() => initMatrix('3'));

  const [resultAB, setResultAB] = useState(null);
  const [resultBA, setResultBA] = useState(null);

  const changeHandlerMaxtrixA = (event, rowIndex, cellIndex) => {
    const { value } = event.target;

    if (validateInput(value)) {
      const newMatrix = [...matrixA];
      newMatrix[rowIndex][cellIndex] = value;
      setMatrixA(newMatrix);
    }
  }

  const changeHandlerMaxtrixB = (event, rowIndex, cellIndex) => {
    const { value } = event.target;

    if (validateInput(value)) {
      const newMatrix = [...matrixB];
      newMatrix[rowIndex][cellIndex] = value;
      setMatrixB(newMatrix);
    }
  }

  const multiplyMatrices = () => {
    multiplyAB();
    multiplyBA();
  }

  const multiplyAB = () => {
    const A = matrixA.map(row => row.map(cell => parseInt(cell)));
    const B = matrixB.map(row => row.map(cell => parseInt(cell)));

    const calcResult = [[], [], []];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        calcResult[i][j] = A[i][0] * B[0][j] + A[i][1] * B[1][j] + A[i][2] * B[2][j];
      }
    }

    const checkIsValid = calcResult.every(row => row.every(cell => !isNaN(cell)));


    if (checkIsValid) {
      checkIsValid && setResultAB(calcResult);
    } else {
      alert('Invalid input');
    }
  }

  const multiplyBA = () => {
    const A = matrixA.map(row => row.map(cell => parseInt(cell)));
    const B = matrixB.map(row => row.map(cell => parseInt(cell)));

    const calcResult = [[], [], []];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        calcResult[i][j] = B[i][0] * A[0][j] + B[i][1] * A[1][j] + B[i][2] * A[2][j];
      }
    }

    const checkIsValid = calcResult.every(row => row.every(cell => !isNaN(cell)));

    if (checkIsValid) {
      checkIsValid && setResultBA(calcResult);
    } else {
      alert('Invalid input');
    }
  }

  return (
    <div className='wrapper'>
      <div className='matrix__container'>
        <Matrix matrix={matrixA} changeHandler={changeHandlerMaxtrixA} />
        <Matrix matrix={matrixB} changeHandler={changeHandlerMaxtrixB} />
      </div>
      <div className='matrix__container'>
        <h2>AB=</h2>
        {resultAB !== null && <Matrix matrix={resultAB} disabled />}
      </div>
      <div className='matrix__container'>
        <h2>BA=</h2>
        {resultBA !== null && <Matrix matrix={resultBA} disabled />}
      </div>
      <button onClick={multiplyMatrices}>Calc</button>
    </div>
  );
}

export default App;
