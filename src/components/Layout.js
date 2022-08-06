//estructura en común para todas las páginas
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <>
        <Navbar/>
        {children}
    </>
  )
}

export default Layout