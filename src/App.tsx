
import {Routes, Route} from "react-router-dom"
import routes from "./routes"
import Header from "./components/Header"



function App() {
  

  return (
    <>
      <Routes>
        {routes.map((route)=> {
          const header = route.showHeader ? <Header/> : null
          return <Route key={route.path} path={route.path} element={<>
            {header}
            {route.element}
          </>}/>
        })}
      </Routes>
    </>
  )
}

export default App
