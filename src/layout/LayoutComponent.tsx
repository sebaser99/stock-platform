import { Navbar } from "../components/navbar/Navbar"

interface Props {
    children: React.ReactNode;
}
export const LayoutComponent: React.FC<Props> = ({children}) => {
  return (
    <div style={{
      backgroundColor: location.pathname === "/" ? "#000" : "#fff",
      color: location.pathname === "/" ? "#fff" : "#000",
      minHeight: '100vh',
      paddingBottom: '50px'
    }}>
        <Navbar />
        <main className="container">
        {
           children
        }
        </main>
        
    </div>
  )
}
