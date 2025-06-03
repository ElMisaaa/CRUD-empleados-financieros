import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Stack
} from "@mui/material";
import { useState, useEffect } from "react";

const departamentos = ["Finanzas", "Marketing"];
const puestosPorDepartamento = {
  Finanzas: ["Analista", "Auditor", "Contador"],
  Marketing: ["Diseñador", "Especialista en SEO"]
};

const EmployeeForm = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    departamento: "",
    fechaIngreso: "",
    puesto: ""
  });

useEffect(() => {
  if (open && !initialData) {
    setFormData({
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      departamento: "",
      fechaIngreso: "",
      puesto: ""
    });
  } else if (initialData) {
    setFormData(initialData);
  }
}, [open, initialData]);

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
    // Si se cambia el departamento, se resetea el puesto
    ...(name === "departamento" && { puesto: "" })
  }));
};


  const handleSubmit = () => {
    if (
      formData.nombres && formData.apellidos &&
      formData.fechaNacimiento && formData.departamento &&
      formData.fechaIngreso && formData.puesto
    ) {
      onSubmit(initialData ? { ...formData, id: initialData.id } : formData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Modificar Empleado" : "Agregar Empleado"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            name="nombres"
            label="Nombre(s)"
            fullWidth
            value={formData.nombres}
            onChange={handleChange}
          />
          <TextField
            name="apellidos"
            label="Apellido(s)"
            fullWidth
            value={formData.apellidos}
            onChange={handleChange}
          />
          <TextField
            name="fechaNacimiento"
            label="Fecha de Nacimiento"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formData.fechaNacimiento}
            onChange={handleChange}
          />
          <TextField
            select
            name="departamento"
            label="Departamento"
            fullWidth
            value={formData.departamento}
            onChange={handleChange}
          >
            {departamentos.map((d) => (
              <MenuItem key={d} value={d}>{d}</MenuItem>
            ))}
          </TextField>
          <TextField
            name="fechaIngreso"
            label="Fecha de Ingreso"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formData.fechaIngreso}
            onChange={handleChange}
          />
          <TextField
            select
            name="puesto"
            label="Puesto"
            fullWidth
            value={formData.puesto}
            onChange={handleChange}
            disabled={!formData.departamento}
          >
            {(puestosPorDepartamento[formData.departamento] || []).map((p) => (
              <MenuItem key={p} value={p}>{p}</MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          {initialData ? "Guardar Cambios" : "Agregar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeForm;
