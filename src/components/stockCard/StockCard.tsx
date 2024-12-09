import { ActionsBought } from "../../interfaces/ActionsBought";
import './stockCard.css';

interface Props {
    action: ActionsBought
}

export const StockCard = ({action}:Props) => {
    const convertDate = (date: number) => {
        const dateHuman = new Date(date).toLocaleString("es-CO", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return dateHuman;
    }
    const priceFormat = (value : number)=> {
        const formattedPrice = new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "USD", // Cambia "COP" por la moneda que necesites (USD, EUR, etc.)
          }).format(value);

        return formattedPrice;
    }
    
  return (
    <div className="stock-entry">
        <div className="stock-entry-head">
            <h4>{action.actionName}</h4>
        </div>
        <div className="stock-entry-body">
            <h5 style={{textAlign:'center'}}><span>Precio: </span>  {priceFormat(action.actionValue)}</h5>
            <h5 style={{textAlign:'center'}}><span>Cant: </span>  {action.actionCant}</h5>
        </div>
       
        <div className="stock-entry-price">
            <h3 style={{textAlign: 'right', marginRight: '5px'}}>{priceFormat(action.total)}</h3>
        </div>
        <h6 className="purchase-date">{convertDate(action.datePurchase)}</h6>
    </div>

  )
}
