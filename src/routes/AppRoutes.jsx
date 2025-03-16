import { Routes, Route } from "react-router-dom";
import EmployeeList from "../pages/EmployeeList";
import AddEmployee from "../pages/AddEmployee";
import EmployeeDetails from "../pages/EmployeeDetails";
import EditEmployee from "../pages/EditEmployee";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeList />} />
      <Route path="/add" element={<AddEmployee />} />
      <Route path="/employee/:id" element={<EmployeeDetails />} />
      <Route path="/edit/:id" element={<EditEmployee />} />
    </Routes>
  );
};

export default AppRoutes;

