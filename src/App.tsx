import { Routes, Route } from "react-router-dom"
import routes from "./routes"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { DeviceProvider } from "./contexts/DeviceContext/DeviceContext"

function App() {
  return (
    <DeviceProvider>
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
    </DeviceProvider>
  )
}

export default App
