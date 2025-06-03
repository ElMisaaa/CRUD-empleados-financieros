import {
  Button, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography
} from "@mui/material";
import { useState } from "react";

const ROWS_PER_PAGE = 10;

function EmployeesTable({ employees, onView, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(employees.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const paginated = employees.slice(startIndex, startIndex + ROWS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Nombre Completo</TableCell>
              <TableCell align="center">Departamento</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay empleados registrados
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell align="center">{emp.id}</TableCell>
                  <TableCell align="center">{emp.nombres} {emp.apellidos}</TableCell>
                  <TableCell align="center">{emp.departamento}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button variant="contained" color="info" onClick={() => onView(emp)}>
                        Ver
                      </Button>
                      <Button variant="contained" color="warning" onClick={() => onEdit(emp)}>
                        Editar
                      </Button>
                      <Button variant="contained" color="error" onClick={() => onDelete(emp.id)}>
                        Eliminar
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {employees.length > ROWS_PER_PAGE && (
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mt={2}>
          <Button variant="outlined" onClick={handlePrevPage} disabled={currentPage === 1}>
            Anterior
          </Button>
          <Typography>Página {currentPage} de {totalPages}</Typography>
          <Button variant="outlined" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Siguiente
          </Button>
        </Stack>
      )}
    </>
  );
}

export default EmployeesTable;
