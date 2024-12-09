import { Company } from "./Company";
import { ActionsBought } from './ActionsBought';
import { Funds } from "./Funds";
import { IMovement } from "./Movement";

export interface Context {
    companies : Company[] | [],
    companiesSearched : Company[] | [],
    actionsBought: ActionsBought[] | [],
    funds: Funds,
    movements: IMovement[] | [],
    setActionsBought: React.Dispatch<React.SetStateAction<ActionsBought[]>>, 
    setMovements: React.Dispatch<React.SetStateAction<IMovement[]>>,
    setFunds:  React.Dispatch<React.SetStateAction<Funds>>,
    search: (query:string, path: string)=> void;
    setCompanies:  React.Dispatch<React.SetStateAction<Company[]>>,
    setCompaniesSearched:  React.Dispatch<React.SetStateAction<Company[]>>,
    buyActions:(company: Company, cant: number)=> void
}