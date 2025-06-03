import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";

const ROWS_PER_PAGE = 5;


function StudentsTable({students, deleteStudent, viewStudent, editStudent}){

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(students.length / ROWS_PER_PAGE);

    const startIndex = (currentPage -1 ) * ROWS_PER_PAGE; 

    const selectedStudents = students.slice(startIndex, startIndex + ROWS_PER_PAGE);

    const handleNextPage =() => {
        console.log("Calling handle next page")
        if (currentPage < totalPages) {
            console.log("Incrementing page");
            setCurrentPage (currentPage + 1);
        }
    }

    const handlePrevPage = () => {
        console.log("Calling handle previous page")
        if (currentPage > 1) {
            console.log("decreasing page")
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Nombre Completo</TableCell>
                            <TableCell align="center">Carrera</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {
                        selectedStudents.length === 0? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No hay alumnos registrados
                                </TableCell>
                            </TableRow>
                        ):(
                        
                        selectedStudents.map((student) =>(
                            <TableRow>
                            <TableCell>{student.id}</TableCell>
                            <TableCell>{student.firstName} {student.lastName}</TableCell>
                            <TableCell>{student.career}</TableCell>
                            <TableCell align="center">
                                <Stack direction="row" 
                                   spacing={1} 
                                   justifyContent="center">
                                    <Button variant="contained"
                                            color="info"
                                            onClick={()=> viewStudent(student)}
                                            >
                                            Ver
                                    </Button>
                                    <Button variant="contained"
                                            color="warning"
                                            onClick={()=> editStudent(student)}
                                            >
                                            Editar
                                    </Button>
                                    <Button variant="contained"
                                            color="error"
                                            onClick= {() => deleteStudent(student.id)}
                                            >
                                            Eliminar
                                    </Button>
                                </Stack>
                            </TableCell>
                            </TableRow>
                        )))}

                        
                    </TableBody>

                </Table>

            </TableContainer>

            {
                students.length > ROWS_PER_PAGE && (
                    <Stack direction="row"
                            spacing={2} 
                            justifyContent="center"
                            alignItems="center">
                        
                        <Button variant="outlined" 
                                onClick={handlePrevPage}
                                disabled={currentPage ===1}>
                            Anterior
                        </Button>
                        <Typography>Página {currentPage} de {totalPages}</Typography>
                        <Button variant="outlined" 
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}>
                              
                            Siguiente
                        </Button>
                    </Stack>

                )
            }
        
        </>
    );
}

export default StudentsTable;