import { FormEvent, useContext, useState } from "react";
import { AppContext } from "../../context/contextProvider";
import './rechargeFund.css';
import { IMovement } from "../../interfaces/Movement";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

interface Props {
    onClose: ()=> void
}
export const RechargeFunds = ({onClose}:Props) => {
    const [inputValue, setInputValue] = useState('');
    const {setFunds, funds, movements, setMovements} = useContext(AppContext);

    const recharge = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        const rechargeValue = Number((inputValue)).toFixed(2);
        MySwal.fire({
            title: "¿Recargar cuenta?",
            text:`Vas a recargar tu cuenta con USD ${rechargeValue}`,
            showDenyButton: true,
            showCancelButton: false,
            denyButtonText: `No Recargar`,
            confirmButtonText: "Recargar",
            reverseButtons: true,
            customClass: {
                popup: "custom-popup",
                title: "custom-title",
                htmlContainer: "custom-html",
                confirmButton: "custom-confirm-button",
                cancelButton: "custom-cancel-button",
            },
          }).then((result) => { 
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const newFunds = {...funds, recharged: funds.recharged +  Number(inputValue), total: funds.total + Number(inputValue) }
                setFunds(newFunds)
                onClose();
                localStorage.setItem('funds', JSON.stringify(newFunds))
                const newMovement : IMovement = {
                    id: `${movements.length + Math.floor(Math.random() * 1000)}`,
                    concept: 'Recarga',
                    payee: 'Stock Platform',
                    value: Number(inputValue),
                    dateRecharge: Date.now()
                }
                const newMovements = [newMovement, ...movements];
                setMovements(newMovements);
                localStorage.setItem('movements', JSON.stringify(newMovements));
            } else if (result.isDenied) {
              Swal.fire({title: "Se ha cancelado la recarga", text: "", icon: "info",
                customClass: {
                    confirmButton: "custom-error-button", // Estilo de botón tras cancelar
                }
              });
            }
        });
    }

  return (
    <form onSubmit={recharge}>
        <h2>Recarga Stock Platform</h2>
        <p>Desde tu cuenta bancaria y compra las acciones con mejor proyección del mercado</p>
        <div className="flex">
            <input className="recharge" value={inputValue} name="value" id="value" required 
            onChange={(e)=> setInputValue(e.target.value)} 
            type="number" placeholder="Ingrese el Valor" />
            <button className="stock-button" type="submit">Recargar</button>
        </div>
    </form>
  )
}
