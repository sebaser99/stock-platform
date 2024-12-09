import { Company } from '../../interfaces/Company';
import { CompanyCard } from '../companyCard/CompanyCard';
import './companies.css';

interface Props {
    companies? : Company[]
}

export const Companies = ({companies = []}: Props) => {
  return (
    <div className="cards-container">
        {
            companies.map(company => <CompanyCard company={company} key={company.id}/>)
        }
    </div>
  )
}
