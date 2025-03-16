import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const EmployeeList = () => {
  const { employees, deleteEmployee } = useContext(EmployeeContext);

  const handleDelete = (id) => {
    // Show SweetAlert2 confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this employee's details!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(id); // Proceed with deletion if confirmed
        Swal.fire("Deleted!", "The employee has been deleted.", "success");
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide">Employee Management</h1>
        <Link
          to="/add"
          className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-gray-200 transition"
        >
          + Add Employee
        </Link>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {/* Employee Details */}
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{employee.name}</h2>
              <p className="text-md text-gray-700 mb-2">{employee.position}</p>
              <p className="text-sm text-gray-500">{employee.email}</p>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-center gap-5">
              <Link
                to={`/employee/${employee.id}`}
                className="text-blue-600 hover:text-blue font-medium text-sm py-2 px-4 border border-blue-600 rounded-md transition duration-200 hover:bg-blue-600 hover:text-white"
              >
                View
              </Link>
              <Link
                to={`/edit/${employee.id}`}
                className="text-yellow-600 hover:text-yellow font-medium text-sm py-2 px-4 border border-yellow-600 rounded-md transition duration-200 hover:bg-yellow-600 hover:text-white"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(employee.id)} // Call handleDelete with employee id
                className="text-red-600 hover:text-red font-medium text-sm py-2 px-4 border border-red-600 rounded-md transition duration-200 hover:bg-red-600 hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
