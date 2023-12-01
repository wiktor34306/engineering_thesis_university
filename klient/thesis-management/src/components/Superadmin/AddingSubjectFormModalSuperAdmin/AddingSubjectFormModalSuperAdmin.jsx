import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import './AddingSubjectFormModalSuperAdminStyle.css';

export const AddingSubjectFormModalSuperAdmin = ({ open, handleClose }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedAcademicDepartment, setSelectedAcademicDepartment] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [departments, setDepartments] = useState([]);
  const [academicDepartments, setAcademicDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    fetch("http://localhost:3001/get-departments", {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
        // setSelectedDepartment(data.length > 0 ? data[0].id_wydzialu : '');
        setSelectedDepartment('');
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("http://localhost:3001/get-academic-departments", {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Otrzymane dane (kierunki):", data);
        setAcademicDepartments(data);
        setSelectedAcademicDepartment('');
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("http://localhost:3001/get-subjects", {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Otrzymane dane (kierunki studiów):", data);
        setSubjects(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddSubject = () => {
    if (isAdding || !selectedDepartment || !selectedAcademicDepartment || !subjectName.trim()) {
      toast.error('Wszystkie pola muszą być wypełnione.');
      return;
    }

    if (isAdding) return;

    setErrorMessage('');
    setSuccessMessage('');
    setIsAdding(true);

    const normalizedSubjectName = subjectName.toLowerCase();

    const subjectData = {
      nazwaKierunku: normalizedSubjectName,
      idWydzialu: selectedDepartment,
      idKatedry: selectedAcademicDepartment,
    };

    fetch("http://localhost:3001/subject-registration", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(subjectData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Odpowiedź serwera:', data);
        if (data && data.message === 'Kierunek studiów zarejestrowany pomyślnie.') {
          toast.success(data.message);
          navigate('/viewallstructuresuperadmin');
          handleClose();
        } else if (data && data.error) {
          toast.error(data.error); 
        } else {
          console.error('Nieprawidłowa odpowiedź serwera.');
          toast.error("Błąd rejestracji kierunku studiów");
        }
        
        setIsAdding(false);
      })
      .catch((error) => {
        console.error('Błąd rejestracji: ', error);
        toast.error('Nie udało się dodać kierunku studiów. Spróbuj ponownie.');
        setIsAdding(false);
        handleClose(); 
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="super-admin-modal-title"
      aria-describedby="super-admin-modal-description"
    >
      <Box className="subject-form-modal">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>

        <h2>Formularz dodawania kierunku do katedry i wydziału</h2>

        <form className="academic-department-super-admin">
          <label htmlFor="subject-select-super-admin">Wydział:</label>

          <select
            className="subject-select-super-admin"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="" disabled selected>
            Wybierz wydział
          </option>
            {departments.map((department) => (
              <option
                key={department.id_wydzialu}
                value={department.id_wydzialu}
              >
                {department.nazwa}
              </option>
            ))}
          </select>

          <label htmlFor="subject-select-super-admin">Katedra:</label>

          <select
            className="subject-select-super-admin"
            value={selectedAcademicDepartment}
            onChange={(e) => setSelectedAcademicDepartment(e.target.value)}
          >
            <option value="" disabled selected>
            Wybierz katedrę
          </option>
            {academicDepartments.map((academicDepartment) => (
              <option
                key={academicDepartment.id_katedry}
                value={academicDepartment.id_katedry}
              >
                {academicDepartment.nazwa}
              </option>
            ))}
          </select>

          <label htmlFor="subject-name-super-admin">Nazwa kierunku studiów:</label>
          <TextField
            id="subject-name-super-admin"
            label="Nazwa kierunku"
            variant="outlined"
            fullWidth
            margin="normal"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />

          <div className="messages">
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>

          <Button
            id="subject-accept-button-super-admin"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleAddSubject();
            }}
          >
            Dodaj kierunek
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
