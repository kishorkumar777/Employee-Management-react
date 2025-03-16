import { createContext, useState, useEffect } from "react";

export const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  // Load employees from localStorage or use empty array as fallback
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = localStorage.getItem("employees");
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  });

  // Save employees to localStorage whenever the employees state changes
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee) => {
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      { id: Date.now(), ...employee },
    ]);
  };

  const deleteEmployee = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedData } : emp
      )
    );
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, deleteEmployee, updateEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
