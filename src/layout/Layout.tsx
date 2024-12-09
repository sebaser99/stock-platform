import { Navbar } from "../components/navbar/Navbar"

interface Props {
    children: React.ReactNode;
}
export const Layout: React.FC<Props> = ({children}) => {
  return (
    <div style={{
      backgroundColor: location.pathname === "/" ? "#000" : "#fff",
      color: location.pathname === "/" ? "#fff" : "#000",
      minHeight: '100vh'
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
