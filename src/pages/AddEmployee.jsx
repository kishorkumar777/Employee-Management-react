import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import { HiUser, HiMail, HiBriefcase } from "react-icons/hi"; // Icons for a visual touch
import Swal from "sweetalert2"; // Import SweetAlert2

const AddEmployee = () => {
  const { addEmployee, employees } = useContext(EmployeeContext);  // Get employees from context
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); 

  const onSubmit = (data) => {
    if (!addEmployee) {
      console.error("addEmployee function is missing!");
      return;
    }
  
    const cleanedData = {
      name: data.name.trim(),
      email: data.email.trim(),
      position: data.position.trim(),
    };
  
    // Check if an employee with the same email already exists
    const employeeExists = employees.some(
      (emp) => emp.email.toLowerCase() === cleanedData.email.toLowerCase()
    );
  
    if (employeeExists) {
      console.log('Swal.fire should be called here'); // Debugging log
      Swal.fire({
        title: "Email already exists!",
        text: "An employee with this email already exists. Please use a different email.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup: 'bg-red-100',
        },
      });
      return;
    }
  
    // Proceed with adding the employee
    addEmployee(cleanedData);
  
    // Show success message
    Swal.fire({
      title: "Employee Added!",
      text: "The new employee has been successfully added.",
      icon: "success",
      confirmButtonText: "OK",
      customClass: {
        popup: 'bg-green-100',
      },
    }).then(() => {
      navigate("/"); // Redirect after success
    });
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl shadow-2xl my-5">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center tracking-wide">
        Add New Employee
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} data-testid="add-employee-form" className="space-y-6 bg-white p-8 rounded-xl shadow-xl">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Full Name</label>
          <div className="flex items-center border-2 border-gray-300 p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition duration-300">
            <HiUser className="text-blue-500 mr-3" />
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="John Doe"
              className="w-full bg-transparent focus:outline-none text-lg"
              autoComplete="off"
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email Address</label>
          <div className="flex items-center border-2 border-gray-300 p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition duration-300">
            <HiMail className="text-blue-500 mr-3" />
            <input
              id="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format"
                }
              })}
              placeholder="johndoe@example.com"
              className="w-full bg-transparent focus:outline-none text-lg"
              autoComplete="off"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="position" className="block text-lg font-medium text-gray-700 mb-2">Job Title</label>
          <div className="flex items-center border-2 border-gray-300 p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition duration-300">
            <HiBriefcase className="text-blue-500 mr-3" />
            <input
              id="position"
              {...register("position", { required: "Position is required" })} 
              placeholder="Software Engineer"
              className="w-full bg-transparent focus:outline-none text-lg"
              autoComplete="off"
            />
          </div>
          {errors.position && <p className="text-red-500 text-sm mt-2">{errors.position.message}</p>}
        </div>

        <button 
          type="submit" 
          className="bg-blue-600 text-white px-6 py-3 w-full rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 focus:outline-none transform transition-all duration-300 hover:scale-105"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
