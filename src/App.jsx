import { useState } from 'react';
import './styles/index.css';

// validate input function
const validateInput = (value) => {
  return /^[0-9+-.\/]*$/.test(value);
}


const App = () => {

  // const [A, setA] = useState(0);
  // const [B, setB] = useState(0);

  let A = 0.5;
  let B = 1;
  const EPSILONE = 0.05;

  let Xm = (B + A) / 2;
  let L = B - A;

  let X1 = A + L / 4;
  let X2 = B - L / 4;


  console.log(X1)
  console.log(X2)

  const calc = (x) => {

    while (Math.abs(calc(Xm) - calc(x)) > EPSILONE) {
      if (calc(Xm) > calc(x)) {
        A = x;
      } else {
        B = x;
      }
      Xm = (B + A) / 2;
      L = B - A;
    }
  }


// return 10 * x * Math.log(x) - (Math.pow(x, 2) / 2)


  const Fx1 = calc(X1);
  const Fx2 = calc(X2);

  console.log(Fx1);
  console.log(Fx2);

  return (
    <div className='wrapper'>
      <div className='matrix__container'>
        {/* <div>
          <label htmlFor="A">A=</label>
          <input
            id="A"
            type="number"
            value={A}
            onChange={(e) => setA(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="B">B=</label>
          <input
            id="B"
            type="number"
            value={B}
            onChange={(e) => setB(e.target.value)}
          />
        </div> */}
      </div>
      {/* <button onClick={test}>Calc</button> */}
    </div>
  );
}

export default App;
