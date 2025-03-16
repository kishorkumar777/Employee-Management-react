import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import AddEmployee from '../pages/AddEmployee'; // Adjust the import path as needed
import { EmployeeContext } from '../context/EmployeeContext';
import Swal from 'sweetalert2'; // Import Swal

// Mock SweetAlert2
vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(() => Promise.resolve({ isConfirmed: true })), // Mock the fire method
  },
}));

// Mock the EmployeeContext
const mockAddEmployee = vi.fn();
const mockEmployees = [];

const MockEmployeeProvider = ({ children }) => {
  return (
    <EmployeeContext.Provider value={{ addEmployee: mockAddEmployee, employees: mockEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};

describe('AddEmployee Component', () => {
  it('should render the form and submit successfully', async () => {
    render(
      <Router>
        <MockEmployeeProvider>
          <AddEmployee />
        </MockEmployeeProvider>
      </Router>
    );

    // Fill out the form
    fireEvent.input(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.input(screen.getByLabelText('Email Address'), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.input(screen.getByLabelText('Job Title'), {
      target: { value: 'Software Engineer' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Add Employee/i }));

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(mockAddEmployee).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'johndoe@example.com',
        position: 'Software Engineer',
      });
    });
  });

  it('should show validation errors when fields are empty', async () => {
    render(
      <Router>
        <MockEmployeeProvider>
          <AddEmployee />
        </MockEmployeeProvider>
      </Router>
    );

    // Submit the form without filling any fields
    fireEvent.click(screen.getByRole('button', { name: /Add Employee/i }));

    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Position is required')).toBeInTheDocument();
    });
  });

  it('should show an error if the email already exists', async () => {
    const mockEmployeesWithEmail = [
      { name: 'Jane Doe', email: 'johndoe@example.com', position: 'Designer' },
    ];

    const MockEmployeeProviderWithEmail = ({ children }) => {
      return (
        <EmployeeContext.Provider value={{ addEmployee: mockAddEmployee, employees: mockEmployeesWithEmail }}>
          {children}
        </EmployeeContext.Provider>
      );
    };

    render(
      <Router>
        <MockEmployeeProviderWithEmail>
          <AddEmployee />
        </MockEmployeeProviderWithEmail>
      </Router>
    );

    // Fill out the form with an existing email
    fireEvent.input(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.input(screen.getByLabelText('Email Address'), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.input(screen.getByLabelText('Job Title'), {
      target: { value: 'Software Engineer' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Add Employee/i }));

    // Wait for the SweetAlert2 popup to be triggered
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Email already exists!',
        text: 'An employee with this email already exists. Please use a different email.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'bg-red-100',
        },
      });
    });
  });
});