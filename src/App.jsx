import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import EmployeeProvider from "./context/EmployeeContext";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <EmployeeProvider> 
      <Router>
        <Navbar /> 
        <AppRoutes />
      </Router>
    </EmployeeProvider>
  );
};

export default App;
