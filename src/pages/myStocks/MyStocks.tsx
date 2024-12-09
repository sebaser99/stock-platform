import { useContext, useEffect } from "react";
import { Layout } from "../../layout/layout";
import './mySotcks.css';
import { AppContext } from "../../context/contextProvider";
import { StockCard } from "../../components/stockCard/StockCard";

export const MyStocks = () => {
  useEffect(() => {
    const data = localStorage.getItem('actionsBought');
    if (data) {
      try {
        const actionsLocalStorage = JSON.parse(data);
        setActionsBought(actionsLocalStorage);
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
      }
    }
  }, [])
  
  const {actionsBought, setActionsBought } = useContext(AppContext);
  return (
    <Layout>
      <h4 className='container-percent'>Acciones adquiridas.</h4>
      <div className='container myStocks'>
        {
          actionsBought.length === 0 ?
          <div className='container-percent movements-container'>
              <h3><strong>Aún no has comprado acciones</strong></h3>
          </div>     
          : 
          <div className="cards-container">
            {actionsBought.map(action => (
              <StockCard key={action.id} action={action}/>
            ))}
          </div>
        }
      </div>
    </Layout>
  )
}
