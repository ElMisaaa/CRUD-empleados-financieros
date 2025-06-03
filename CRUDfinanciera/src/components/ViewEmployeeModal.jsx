import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Stack
} from "@mui/material";

const ViewEmployeeModal = ({ open, onClose, employee }) => {
  if (!employee) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Detalles del Empleado</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Typography><strong>ID Empleado:</strong> {employee.id}</Typography>
          <Typography><strong>Nombre(s):</strong> {employee.nombres}</Typography>
          <Typography><strong>Apellido(s):</strong> {employee.apellidos}</Typography>
          <Typography><strong>Fecha de Nacimiento:</strong> {employee.fechaNacimiento}</Typography>
          <Typography><strong>Departamento:</strong> {employee.departamento}</Typography>
          <Typography><strong>Fecha de Ingreso:</strong> {employee.fechaIngreso}</Typography>
          <Typography><strong>Puesto:</strong> {employee.puesto}</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewEmployeeModal;
