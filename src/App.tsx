import { Routes, Route } from "react-router-dom"
import routes from "./routes"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Routes>
        {
          routes.map((route) => {
            const header = route.showHeader ? <Header /> : null
            const footer = route.showFooter ? <Footer /> : null
            return <Route key={route.path} path={route.path} element={
              <>
                {header}
                {route.element}
                {footer}
              </>}
            />
          })}
      </Routes>
    </>
  )
}

export default App
