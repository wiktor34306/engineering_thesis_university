import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import './AddingTopicFormModalSuperAdminStyle.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";

export const AddingTopicFormModalSuperAdmin = ({ open, handleClose }) => {
  const [supervisors, setSupervisors] = useState([]);
  const [academicDepartments, setAcademicDepartments] = useState([]);
  const [selectedAcademicDepartment, setSelectedAcademicDepartment] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [topicName, setTopicName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [supervisorsMap, setSupervisorsMap] = useState({});
  const [existingTopicNames, setExistingTopicNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/get-academic-departments", {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Otrzymane nazwy katedr:", data);
        setAcademicDepartments(data);
        setSelectedAcademicDepartment('');
      })
      .catch((error) => {
        console.error(error);
      });

      fetch("http://localhost:3001/get-supervisors", {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })

      .then((response) => response.json())
      .then((data) => {
        console.log("Otrzymani promotorzy:", data);
        const sortedSupervisors = data.sort((a, b) =>
          a.nazwisko.localeCompare(b.nazwisko)
        );
        setSupervisors(sortedSupervisors);
        setSelectedSupervisor('');
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania promotorów: ', error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/get-existing-topic-names", {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Istniejące nazwy tematów:", data);
        setExistingTopicNames(data.map((topic) => topic.temat.toLowerCase()));
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania istniejących nazw tematów: ', error);
      });
  }, []);

  const handleAddTopic = () => {
    if (isAdding || !selectedSupervisor || !selectedAcademicDepartment || !topicName.trim()) {
      toast.error('Wszystkie pola muszą być wypełnione.');
      return;
    }

    // Sprawdzenie, czy temat o danej nazwie już istnieje
    const formattedTopicName = topicName.trim().toLowerCase();
    if (existingTopicNames.includes(formattedTopicName)) {
      toast.error('Temat o podanej nazwie już istnieje.');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    setIsAdding(true);

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const id_uzytkownika_dodajacego = decodedToken.id_uzytkownika;

    const topicData = {
      id_katedry: selectedAcademicDepartment,
      id_promotora: selectedSupervisor,
      temat: topicName,
      status: true,
      id_uzytkownika_dodajacego: id_uzytkownika_dodajacego
    };

    console.log('Wysyłane dane:', topicData);

    fetch("http://localhost:3001/adding-topic", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(topicData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Odpowiedź serwera:', data);
        if (data && data.id_tematu) {
          toast.success(data.message);
          navigate('/viewalltopicssuperadmin');
          handleClose();
        } else if (data && data.error) {
          toast.error(data.error);
        } else {
          console.error('Nieprawidłowa odpowiedź serwera.');
          toast.error("Błąd dodawania tematu");
        }

        setIsAdding(false);
      })
      .catch((error) => {
        console.error('Błąd podczas wysyłania żądania:', error);
        toast.error('Nie udało się dodać tematu. Spróbuj ponownie.');
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
      <Box className="adding-topic-form-modal">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>

        <h2>Formularz dodawania tematu pracy dyplomowej</h2>

        <form className="adding-topic-super-admin">
          <label htmlFor="topic-select-super-admin">Promotor:</label>

          <select
    className="topic-select-super-admin"
    value={selectedSupervisor}
    onChange={(e) => setSelectedSupervisor(e.target.value)}
  >
    <option value="" disabled selected>
      Wybierz promotora
    </option>
    {supervisors.map((supervisor) => (
      <option
        key={supervisor.id_promotora}
        value={supervisor.id_promotora}
      >
         {`${supervisor.nazwisko} ${supervisor.imie}`}
      </option>
    ))}
  </select>

  <label htmlFor="topic-select-super-admin">Katedra:</label>
  <select
    className="topic-select-super-admin"
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

          <TextField
            label="Temat"
            variant="outlined"
            fullWidth
            margin="normal"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          />

          <div className="messages">
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>

          <Button
            id="topic-accept-button-super-admin"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleAddTopic();
            }}
          >
            Dodaj temat
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
