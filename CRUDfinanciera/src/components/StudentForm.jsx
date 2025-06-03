import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const careers = [
    {value: "Ingenieria en Sistemas", label:"Ingenieria en Sistemas"},
    {value: "Derecho", label:"Derecho"}
]

function StudentForm({handleClose, addStudent, editingStudent, updateStudent}){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate]= useState("");
    const [career, setCareer]=useState("");

    useEffect(()=>{
        if (editingStudent){
            setFirstName(editingStudent.firstName);
            setLastName(editingStudent.lastName);
            setBirthDate(editingStudent.birthDate);
            setCareer(editingStudent.career);
        } else{
            setFirstName("");
            setLastName("");
            setBirthDate("");
            setCareer("");
        }
    }, [editingStudent]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!firstName.trim() || !lastName.trim() || !birthDate || !career)
            return;

        const studentData = {firstName, lastName, birthDate, career};

        if (editingStudent){
            updateStudent({...editingStudent, ...studentData})
        }else {
            addStudent(studentData);
        }

        
    }

    return (
        <Box component ="form" onSubmit={handleSubmit} sx={{display:"flex", flexDirection:"column", gap:2}}>
    
            <TextField
            label = "Nombres"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
            />

            <TextField
            label = "Apellidos"
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
            
            />

            <TextField
            type ="date"
            InputLabelProps={{shrink:true}}
            label = "Fecha de nacimiento"
            value={birthDate}
            onChange={(e)=>setBirthDate(e.target.value)}
            />

            <TextField
            select
            label = "Carrera"
            value={career}
            onChange={(e)=>setCareer(e.target.value)}>

            {careers.map((option)=>(
                <MenuItem key={option.value} value={option.label}>
                    {option.label}
                </MenuItem>
            ))}

            </TextField>

            <Stack direction="row" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary">
                {editingStudent ? "Actualizar": "Agregar"}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
                Cancelar
            </Button>
            </Stack>

        </Box>
    );
}

export default StudentForm;