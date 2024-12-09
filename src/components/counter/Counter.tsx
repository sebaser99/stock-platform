import { Dispatch, SetStateAction } from 'react';
import './counter.css';

interface Props {
    value : number,
    setValue : Dispatch<SetStateAction<number>>
}
export const Counter = ({value, setValue}: Props) => {

    const incrementDecrement = (value : '+' | '-')=> {
        // if(valueCounter === 0) return;
        // if(value === '-'){
        //     return setValueCounter((prevValue) => prevValue - 1 )
        // }
        // setValueCounter((prevValue) => prevValue + 1)

        setValue((prevValue) => {
            if (value === '-' && prevValue === 1) return prevValue; // Evita valores negativos
            return value === '+' ? prevValue + 1 : prevValue - 1;   // Incrementa o decrementa
        });
    }
  return (
    <div className="counter">
        <button onClick={()=> incrementDecrement('-')}>-1</button>
        <p>{value}</p>
        <button onClick={()=> incrementDecrement('+')}>+1</button>
    </div>
    
  )
}
