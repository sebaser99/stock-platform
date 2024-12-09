import { useContext, useState } from "react";
import { Company } from "../../interfaces/Company";
import { Counter } from "../counter/Counter";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

import './companyCard.css';
import { AppContext } from "../../context/contextProvider";
import { IMovement } from "../../interfaces/Movement";


interface Props {
    company: Company
}

export const CompanyCard = ({company}: Props) => {
    const [valueCounter, setValueCounter] = useState<number>(1);
    const {buyActions, setFunds, funds, movements, setMovements} = useContext(AppContext);

    const formattedPrice = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "USD", // Cambia "COP" por la moneda que necesites (USD, EUR, etc.)
      }).format(company.price);
    let formattedTotal = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD", // Cambia "COP" por la moneda que necesites (USD, EUR, etc.)
    }).format(company.price * valueCounter);
  
   
 
    const handleBuy = ()=> {
        MySwal.fire({
            title: "¿Quieres Comprar estas acciones?",
            text:`${company.company} - ${valueCounter} unds - ${formattedTotal}`,
            showDenyButton: true,
            showCancelButton: false,
            denyButtonText: `No comprar`,
            confirmButtonText: "Comprar",
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
              const spend = Number((company.price * valueCounter).toFixed(2));
              if(funds.total >=  spend){
                buyActions(company, valueCounter);
                const newFunds = {...funds, spent: funds.spent + spend  , total: funds.total - spend}
                setFunds(newFunds)
                localStorage.setItem('funds', JSON.stringify(newFunds));

                const newMovement : IMovement = {
                    id: `${movements.length + Math.floor(Math.random() * 1000)}`,
                    concept: 'Compra',
                    payee: company.company,
                    value: spend,
                    dateRecharge: Date.now()
                }
                const newMovements = [newMovement, ...movements];
                setMovements(newMovements);
                localStorage.setItem('movements', JSON.stringify(newMovements));
                Swal.fire({title: "Excelente, compra Exitosa! ", text: "", icon: "success",
                  customClass: {
                      confirmButton: "custom-success-button", // Estilo de botón tras cancelar
                  }
                });
              } else {
                Swal.fire({title: "No tienes Fondos suficientes", text: "Recarga para poder realizar esta compra", icon: "error",
                  customClass: {
                      confirmButton: "custom-error-button", // Estilo de botón tras cancelar
                  }
                });
              }
              
            } else if (result.isDenied) {
              Swal.fire({title: "Se ha cancelado la compra", text: "", icon: "info",
                customClass: {
                    confirmButton: "custom-error-button", // Estilo de botón tras cancelar
                }
              });
            }
          });
    }
    


  return (
    <div className="card">
        <div className="card-header">
            <h3>{company.company}</h3>
        </div>
        <div className="card-body">
            <p><strong style={{color: "#2c3469"}}>Stock:</strong> {company.stock} acciones</p>
            <p><strong style={{color: "#2c3469"}}>Precio:</strong> {formattedPrice}</p>
        </div>
        <div className="card-footer">
            <div className="card-footer-info"> 
                <p className="card-footer-description">Compra tus acciones</p>
                <p className="card-footer-description"><b> {formattedTotal}</b></p>
            </div>
            <div className="card-footer-info">
                <Counter value={valueCounter} setValue={setValueCounter}/>
                <button className="btn buy" onClick={handleBuy}>Comprar</button>
            </div>   
        </div>
    </div>
  )
}
