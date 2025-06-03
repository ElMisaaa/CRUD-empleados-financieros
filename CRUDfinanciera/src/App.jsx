import { Button, Container, Typography, Stack, Modal, Box } from "@mui/material";

import StudentsTable from "./components/StudentsTable";
import StudentForm from "./components/StudentForm";
import ViewStudentModal from "./components/ViewStudentsModal"; 
import { useState } from "react";




function App() {

  const [openForm, setOpenForm]= useState(false);
  const [openView, setOpenView] = useState(false);  
  const [students, setStudents]= useState([])
  const [viewingStudent, setViewingStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleOpenForm =() =>{
    setOpenForm(true);
    setEditingStudent(null);
  };

  const handleCloseForm =() => setOpenForm(false);

  const handleCloseView = () => {
    setViewingStudent(null);
    setOpenView(false);
  }


  const addStudent = (student) => {
    setStudents ([...students, {id: Date.now(), ...student}]);
    handleCloseForm ();
  }

  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((student) => 
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    handleCloseForm();
  };


  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  }

  const editStudent = (student) => {
    setEditingStudent(student);
    setOpenForm(true);
  }

  const handleOpenView = (student) => {
    setViewingStudent(student);
    setOpenView(true);
  }


  return (
    <Container maxWidth="md" sx={{mt:4}}>

      <Stack>
      <Typography variant="h3" align="center" gutterBottom>
        Gestión de Alumnos UPANA
      </Typography>

      <Button variant="contained" color="primary" width="false" sx={{mb:3}} 
      onClick={handleOpenForm}>
        Agregar Alumno (+)
      </Button>


      <StudentsTable
      students = {students}
      deleteStudent = {deleteStudent}
      viewStudent = {handleOpenView}
      editStudent={editStudent}
      />

      <Modal open={openForm} onClose={handleCloseForm}>
        <Box 
          sx={{
            position:"absolute",
            top:"50%",
            left:"50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
              
          }}>
            <StudentForm 
            handleClose={handleCloseForm}
            addStudent= {addStudent}
            editingStudent={editingStudent}
            updateStudent={updateStudent}
            />
            
        </Box>
      </Modal>

      <Modal open={openView} onClose={handleCloseView}> 
        <Box 
          sx={{
            position:"absolute",
            top:"50%",
            left:"50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}>
            <ViewStudentModal student={viewingStudent}/>
        </Box>
      </Modal>
      
      </Stack>

    </Container>

  );
}

export default App;