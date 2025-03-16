import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";

const EmployeeDetails = () => {
  const { id } = useParams();
  const { employees } = useContext(EmployeeContext);

  const employee = employees.find((emp) => emp.id === parseInt(id));

  if (!employee) {
    return <h1 className="text-xl text-red-500 font-semibold">Employee not found</h1>;
  }

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-2xl">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Employee Details</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
        <p className="text-lg font-medium text-gray-700">
          <strong className="text-gray-900">Name:</strong> {employee.name}
        </p>
        <p className="text-lg font-medium text-gray-700">
          <strong className="text-gray-900">Email:</strong> {employee.email}
        </p>
        <p className="text-lg font-medium text-gray-700">
          <strong className="text-gray-900">Position:</strong> {employee.position}
        </p>

        <Link 
          to="/" 
          className="block text-center mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transform transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none"
        >
          Back to Employee List
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDetails;
