import { Button, Container, Typography, Stack } from "@mui/material";
import { useState } from "react";

import EmployeesTable from "./components/EmployeesTable";
import EmployeeForm from "./components/EmployeeForm";
import ViewEmployeeModal from "./components/ViewEmployeeModal";

function App() {
  const [employees, setEmployees] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleOpenForm = () => {
    setEditingEmployee(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => setOpenForm(false);
  const handleCloseView = () => {
    setViewingEmployee(null);
    setOpenView(false);
  };

  const addEmployee = (employee) => {
    const newId = employees.length > 0
      ? Math.max(...employees.map((e) => e.id)) + 1
      : 1;
    setEmployees([...employees, { id: newId, ...employee }]);
    handleCloseForm();
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map((e) =>
      e.id === updatedEmployee.id ? updatedEmployee : e
    ));
    handleCloseForm();
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Gestión de Empleados</Typography>
        <Button variant="text" onClick={handleOpenForm}>
          Agregar Empleado
        </Button>
      </Stack>

      <EmployeesTable
        employees={employees}
        onView={(e) => {
          setViewingEmployee(e);
          setOpenView(true);
        }}
        onEdit={(e) => {
          setEditingEmployee(e);
          setOpenForm(true);
        }}
        onDelete={deleteEmployee}
      />

      <EmployeeForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={editingEmployee ? updateEmployee : addEmployee}
        initialData={editingEmployee}
      />

      <ViewEmployeeModal
        open={openView}
        onClose={handleCloseView}
        employee={viewingEmployee}
      />
    </Container>
  );
}

export default App;