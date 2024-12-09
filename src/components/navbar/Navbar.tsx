import { Link } from "react-router-dom"
import './navbar.css';
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/contextProvider";
import { useDebounce } from "../../hooks/useDebounce";

export const Navbar = () => {
 
  const {search} = useContext(AppContext);

  const [query, setQuery] = useState("");
  const [pathNav, setPathNav] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const debouncedQuery = useDebounce(query, 300); // 300
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if(debouncedQuery === ''){
        search('', pathNav);
    }else if (debouncedQuery) {
      search(debouncedQuery, pathNav);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setPathNav(currentPath);
  
  }, [])
  useEffect(() => {
    if(pathNav === '/') return setPlaceholder('Buscar compañia');
    else if(pathNav === '/MyStocks') return setPlaceholder('Buscar Acción')
  }, [pathNav])

  useEffect(() => {
    // Configurar la visibilidad inicial
    updateVisibility();

    // Añadir un event listener para cambios en el tamaño de la pantalla
    window.addEventListener("resize", updateVisibility);

    // Limpia el event listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const updateVisibility = () => {
    // Oculta el botón si el ancho de la pantalla es menor a 768px
    setIsVisible(window.innerWidth > 600);
  };
  
  
  return (
    <>
      <nav className="navbar">
        <div className="container container-navbar">
          <Link to="/" style={{textDecoration: 'none'}}><p className="logo">Stock Platform</p></Link>
          {
            pathNav !== '/MyFunds' && isVisible && (
              <div className="search-container">
                <input id="searchCompany" 
                style={{
                  width: '171px'
                }}
                value={query} 
                name='searchCompany' 
                className="search" type="text" 
                placeholder={placeholder} 
                onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            )
        }
        {
          isVisible && (
              <ul className="nav-links">
                <li><Link to="/"  
                      style={{
                        fontWeight: location.pathname === "/" ? "bold" : "normal",
                        textDecoration: "none",
                      }}>Home</Link></li>
                <li><Link to="/MyStocks"
                      style={{
                        fontWeight: location.pathname === "/MyStocks" ? "bold" : "normal",
                        textDecoration: "none",
                      }}
                      >MyStocks</Link></li>
                <li><Link to="/MyFunds"
                      style={{
                        fontWeight: location.pathname === "/MyFunds" ? "bold" : "normal",
                        textDecoration: "none",
                      }}
                    >MyFunds</Link></li>
            </ul>
          )
        }
        {
        !isVisible &&  (
          <div className={`hamburger-menu ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )
      }
        </div> 
        {
            pathNav !== '/MyFunds' && !isVisible && (
              <div style={{margin: '10px'}}>
                <input id="searchCompany" 
                style={{
                  width: '171px'
                }}
                value={query} 
                name='searchCompany' 
                className="search" type="text" 
                placeholder={placeholder} 
                onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            )
        }
      </nav>
      
      <div className={`menu ${isOpen ? "open" : ""}`}>
        {
          isOpen && (<div style={{cursor: 'pointer'}} onClick={toggleMenu}>
                <p style={{color: 'red', position: 'fixed', top: 10, right: 20, fontSize: '25px'}}>X</p>
              </div>)
        }
        
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </>
   
  )
}
