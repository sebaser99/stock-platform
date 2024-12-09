import { useContext, useEffect } from "react";
import { getAllCompanies } from "../../services/companiesService";
import { Companies } from "../../components/companies/Companies";
import { AppContext } from "../../context/contextProvider";
import { Company } from "../../interfaces/Company";
import { stock } from "../../data/stock";
import { Layout } from "../../layout/layout";

export default function Home(){
    useEffect(() => {
      const fetchData = async () => {
        try {
          if(!localStorage.getItem('companies')){
            const dataRes = await getAllCompanies();
            const companies = dataRes.stocks;
            const companiesWithStock = companies.map((company: Company, index: number) => ({...company, stock : stock[index], id: index + 1}))
            setCompanies(companiesWithStock);
            setCompaniesSearched(companiesWithStock);
            localStorage.setItem('companies', JSON.stringify(companiesWithStock));
          } else {
            const companiesStorage = JSON.parse(localStorage.getItem('companies')!);
            setCompanies(companiesStorage);
            setCompaniesSearched(companiesStorage);
          }
        } catch (error) {
          console.error("Error fetching companies:", error);
        }
      };

      fetchData()
    }, [])

  const {companiesSearched, setCompanies, setCompaniesSearched} = useContext(AppContext)
  
  return (
    <Layout>
        <h4 className='container-percent'>Compra acciones de las empresas más rentables del mundo. Mira en tiempo real cómo cambia su stock y comportamiento</h4>
        <Companies companies={companiesSearched} />
    </Layout>
  )
}
