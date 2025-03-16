import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";
import Swal from "sweetalert2"; // Import SweetAlert2

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, updateEmployee } = useContext(EmployeeContext);

  // Convert id to number
  const employeeId = Number(id);
  const employee = employees?.find((emp) => emp.id === employeeId);

  // Redirect if employee not found
  useEffect(() => {
    if (!employee) {
      navigate("/");
    }
  }, [employee, navigate]);

  // Local state for form data
  const [formData, setFormData] = useState({
    name: employee?.name || "",
    position: employee?.position || "",
    email: employee?.email || "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        position: employee.position,
        email: employee.email,
      });
    }
  }, [employee]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(employeeId, formData);

    // Show SweetAlert after updating employee
    Swal.fire({
      title: "Success!",
      text: "Employee details have been updated.",
      icon: "success",
      confirmButtonText: "Okay",
    }).then(() => {
      navigate("/"); // Redirect to the employee list after successful update
    });
  };

  // If employee not found (just in case)
  if (!employee) return null;

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">Edit Employee</h1>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-lg font-medium text-gray-700 mb-2 block">Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="John Doe" 
              className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              required
            />
          </div>

          <div>
            <label htmlFor="position" className="text-lg font-medium text-gray-700 mb-2 block">Job Position</label>
            <input 
              type="text" 
              name="position" 
              value={formData.position} 
              onChange={handleChange} 
              placeholder="Software Engineer" 
              className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-lg font-medium text-gray-700 mb-2 block">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="johndoe@example.com" 
              className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 transform transition-all duration-300 hover:scale-105"
          >
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
