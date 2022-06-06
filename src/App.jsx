import { useState } from 'react';
import './styles/index.css';

// Matrix 3 x 3 important
const initMatrix = (rows = 3, columns = 3, defaultValue = '') => {
  const array = [];
  for (let i = 0; i < rows; i++) {
    array[i] = [];
    for (let j = 0; j < columns; j++) {
      array[i][j] = defaultValue;
    }
  }

  return array;
}

// validate input function
const validateInput = (value) => {
  return /^[0-9+-.\/]*$/.test(value);
}

const getTransposedMatrix = (matrix) => {
  const transposedMatrix = initMatrix(matrix[0]?.length, matrix?.length);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      transposedMatrix[j][i] = matrix[i][j];
    }
  }

  return transposedMatrix;
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

  const [matrixA, setMatrixA] = useState(() => initMatrix(2, 4, '11'));
  const [matrixB, setMatrixB] = useState(() => initMatrix(3, 4, '22'));

  const [transposedMatrix, setTransposedMatrix] = useState(null);

  const [result, setResult] = useState(null);

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
    const transposedMatrixB = getTransposedMatrix(matrixB);

    setTransposedMatrix(transposedMatrixB);

    const A = matrixA.map(row => row.map(cell => parseInt(cell)));
    const B = transposedMatrixB.map(row => row.map(cell => parseInt(cell)));

    const calcResult = [[], []];



    // calcResult[0][0] = (A[0][0] * B[0][0]) + (A[0][1] * B[1][0]) + (A[0][2] * B[2][0]) + (A[0][3] * B[3][0]);
    // calcResult[0][1] = (A[0][0] * B[0][1]) + (A[0][1] * B[1][1]) + (A[0][2] * B[2][1]) + (A[0][3] * B[3][1]);
    // calcResult[0][2] = (A[0][0] * B[0][2]) + (A[0][1] * B[1][2]) + (A[0][2] * B[2][2]) + (A[0][3] * B[3][2]);

    // calcResult[1][0] = (A[1][0] * B[0][0]) + (A[1][1] * B[1][0]) + (A[1][2] * B[2][0]) + (A[1][3] * B[3][0]);
    // calcResult[1][1] = (A[1][0] * B[0][1]) + (A[1][1] * B[1][1]) + (A[1][2] * B[2][1]) + (A[1][3] * B[3][1]);
    // calcResult[1][2] = (A[1][0] * B[0][2]) + (A[1][1] * B[1][2]) + (A[1][2] * B[2][2]) + (A[1][3] * B[3][2]);


    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        calcResult[i][j] = A[i][0] * B[0][j] + A[i][1] * B[1][j] + A[i][2] * B[2][j] + A[i][3] * B[3][j];
      }
    }


    // result[0][0] = (A[0][0] * B[0][0]) + (A[0][1] * B[1][0]) + (A[0][2] * B[2][0]);
    // result[0][1] = (A[0][0] * B[0][1]) + (A[0][1] * B[1][1]) + (A[0][2] * B[2][1]);
    // result[0][2] = (A[0][0] * B[0][2]) + (A[0][1] * B[1][2]) + (A[0][2] * B[2][2]);

    // result[1][0] = (A[1][0] * B[0][0]) + (A[1][1] * B[1][0]) + (A[1][2] * B[2][0]);
    // result[1][1] = (A[1][0] * B[0][1]) + (A[1][1] * B[1][1]) + (A[1][2] * B[2][1]);
    // result[1][2] = (A[1][0] * B[0][2]) + (A[1][1] * B[1][2]) + (A[1][2] * B[2][2]);

    // result[2][0] = (A[2][0] * B[0][0]) + (A[2][1] * B[1][0]) + (A[2][2] * B[2][0]);
    // result[2][1] = (A[2][0] * B[0][1]) + (A[2][1] * B[1][1]) + (A[2][2] * B[2][1]);
    // result[2][2] = (A[2][0] * B[0][2]) + (A[2][1] * B[1][2]) + (A[2][2] * B[2][2]);



    const checkIsValid = calcResult.every(row => row.every(cell => !isNaN(cell)));


    if (checkIsValid) {
      checkIsValid && setResult(calcResult);
    } else {
      alert('Invalid input');
    }
  }
  console.log(transposedMatrix)
  return (
    <div className='wrapper'>
      <div className='matrix__container'>
        <div className='matrix__item'>
          <h2>Matrix A=</h2>
          <Matrix matrix={matrixA} changeHandler={changeHandlerMaxtrixA} />
        </div>
        <div className='matrix__item'>
          <h2>Matrix B=</h2>
          <Matrix matrix={matrixB} changeHandler={changeHandlerMaxtrixB} />
        </div>
      </div>
      <div className='matrix__container'>
        <div className='matrix__item'>
        <h2>Transposed matrix B=</h2>
        {transposedMatrix !== null && <Matrix matrix={transposedMatrix} disabled />}
        </div>
      </div>
      <div className='matrix__container'>
        <div className='matrix__item'>
          <h2>Result=</h2>
          {result !== null && <Matrix matrix={result} disabled />}
        </div>
      </div>
      <button onClick={multiplyMatrices}>Calc</button>
    </div>
  );
}

export default App;
