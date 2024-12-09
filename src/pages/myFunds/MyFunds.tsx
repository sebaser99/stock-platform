import { Modal } from "../../components/modal/Modal";
import { RechargeFunds } from "../../components/rechargeFunds/RechargeFunds";
import { TableRow } from "../../components/tableRow/TableRow";
import { AppContext } from "../../context/contextProvider";
import { LayoutComponent } from "../../layout/LayoutComponent";
import './myFunds.css';
import '../../components/tableRow/tableRow.css';  
import { useContext, useState } from 'react';


export const MyFunds = () => {  
  const {funds, movements} = useContext(AppContext);
  const [modal, setModal] = useState(false);

    const changeModal = ()=> {
        setModal((prevModal => !prevModal))
    }

    const formattedPrice = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "USD", // Cambia "COP" por la moneda que necesites (USD, EUR, etc.)
    }).format(funds.total);
  return (
    <LayoutComponent>
      <h4 style={{marginTop: '40px', marginBottom: '20px  '}} className='container-percent'>Aumenta los fondos de tu cuenta, consulta tu saldo y los gastos realizados en compras de acciones.</h4>
      <div className='container'>
        <div className='funds-nav'>
          <h3 style={{margin: '0px 5px'}}>Fondos:  <span style={{fontWeight: 'bold'}}>{ formattedPrice}</span></h3>
          <div>
            <button className="stock-button" onClick={changeModal}>Cargar Fondos</button>
          </div>
        </div>
        <div className="container-percent">
          <h2 style={{marginTop: "30px"}}>Movimientos</h2>
          <div className="movements-container">
            <table id="usersTable">
              <thead>
                  <tr>
                      <th>Fecha</th>
                      <th>Valor</th>
                      <th>Tipo</th>
                      <th>Beneficiario</th>
                  </tr>
              </thead>
              <tbody>              
                {
                  movements.length > 0 ?
                    movements.map(movement =>(<TableRow movement={movement} key={movement.id} />))
                  :  <h3><strong>Aún no has realizado movimientos en tu cuenta</strong></h3>
                }                 
              </tbody>
              
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} onClose={changeModal} children={
        <RechargeFunds onClose={changeModal} />
      } />
    </LayoutComponent>
  )
}
