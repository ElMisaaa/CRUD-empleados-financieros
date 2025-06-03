import { Stack, Typography } from "@mui/material";

function ViewStudentsModal({student}) {

  if (!student) return null;
  return (
    <Stack spacing={2}>
        <Typography variant="h5" >Detalles de Alumno</Typography>
        <Typography><strong>Nombre:</strong>{student.firstName} {student.lastName}</Typography>
        <Typography><strong>Fecha de Nacimiento:</strong> {student.birthDate}</Typography>
        <Typography><strong>Carrera:</strong> {student.career}</Typography>
    </Stack>
  );
}

export default ViewStudentsModal;