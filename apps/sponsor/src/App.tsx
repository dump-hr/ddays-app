import { Switch, Route } from "wouter"
import { Path } from "./constants/paths"
import MaterialsPage from "./pages/MaterialsPage"

function App() {

  return (
    <Switch>
      <Route path={Path.Materials} component={MaterialsPage}/>
    </Switch>
  )
}

export default App
