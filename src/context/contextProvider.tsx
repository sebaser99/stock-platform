import { createContext, useState } from "react";
import { Context } from "../interfaces/Context";
import { Company } from "../interfaces/Company";
import { Funds } from "../interfaces/Funds";
import { ActionsBought } from "../interfaces/ActionsBought";
import { IMovement } from "../interfaces/Movement";

interface Props {
    children: React.ReactNode
}
let initialFunds: Funds;

if(localStorage.getItem('funds')){
    const storageFunds = JSON.parse( localStorage.getItem('funds')!);
    initialFunds = storageFunds;
} else {
    initialFunds =  {
        initialBalance: 0,
        spent: 0,
        recharged: 0,
        total : 0
    }
}

let initialMovements: IMovement[];

if(localStorage.getItem('movements')){
    const storageMovements = JSON.parse( localStorage.getItem('movements')!);
    initialMovements = storageMovements;
} else {
    initialMovements =  [];
}


export const AppContext = createContext<Context>({
    companies: [],
    companiesSearched: [],
    actionsBought: [],
    funds: JSON.parse(localStorage.getItem('funds')!) ?? initialFunds,
    movements: [],
    setMovements: ()=>{},
    setActionsBought: ()=>{},
    setFunds: ()=> {},
    search: ()=> {},
    setCompanies: ()=>{},
    setCompaniesSearched: ()=>{},
    buyActions: ()=> {},
});

export const AppProvider = ({children}:Props) => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [companiesSearched, setCompaniesSearched] = useState<Company[]>([]);
    const [actionsBought, setActionsBought] = useState<ActionsBought[]>([]);
    const [movements, setMovements] = useState<IMovement[]>(initialMovements);
    const [funds, setFunds] = useState<Funds>(initialFunds);


    const search = (query: string, path: string) => {
        if(path === '/') {
            if(query.length === 0){
                return setCompaniesSearched(companies);
            }
            const filteredCompanies = companies.filter((c) =>
              c.company.toLowerCase().includes(query.toLowerCase())
            );
            setCompaniesSearched(filteredCompanies);

        } else if(path === '/MyStocks'){
            if(query.length === 0){
                const data = localStorage.getItem('actionsBought');
                if(data){
                    try {
                        const storageActionsBought = JSON.parse(data);
                        return setActionsBought(storageActionsBought);
                    } catch(error){
                        console.log(error)   
                    }
                } else {
                    return setActionsBought([]);
                }
                
            }
            const filteredActionsBought = actionsBought.filter((c) =>
              c.actionName.toLowerCase().includes(query.toLowerCase())
            );
            setActionsBought(filteredActionsBought);
        }
       
    };

    const buyActions = (companyBought: Company, cant: number)=> {
        const editedCants = companies.map(company => {
            if(company.id === companyBought.id){
                company.stock = company.stock - cant
            }
            return company;
        })

        const newBoughtAction: ActionsBought = {
            id: `$actionsBought.length}-${Math.floor(Math.random() * 1000)}`,
            actionCant: cant,
            actionName: companyBought.company,
            actionValue: companyBought.price,
            total: cant * companyBought.price,
            datePurchase: Date.now()
        }
        const actionsToSave = [...actionsBought,newBoughtAction];
        setCompanies(editedCants);
        setCompaniesSearched(editedCants);
        setActionsBought(actionsToSave)
        localStorage.setItem('companies', JSON.stringify(companies));
        localStorage.setItem('actionsBought', JSON.stringify(actionsToSave));
    }
  return (
    <AppContext.Provider value={{ companies, companiesSearched, search, setCompanies, 
    setCompaniesSearched, buyActions, actionsBought, funds, setActionsBought, setFunds, movements, setMovements
    }}>
    {children}
  </AppContext.Provider>
  )
}
