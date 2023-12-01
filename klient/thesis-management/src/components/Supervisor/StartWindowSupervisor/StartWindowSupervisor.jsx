import React, { useEffect, useState } from 'react';
import './StartWindowSupervisorStyle.css';
import { Footer } from '../../Footer/Footer';
import { jwtDecode } from "jwt-decode";
import { SideNavbarSupervisor } from '../SideNavbarSupervisor/SideNavbarSupervisor';

export const StartWindowSupervisor = () => {
  const [amountOfUsers, setAmountOfUsers] = useState(0);
  const [amountOfStudents, setAmountOfStudents] = useState(0);
  const [amountOfSupervisors, setAmountOfSupervisors] = useState(0);
  const [amountOfTopics, setAmountOfTopics] = useState(0);

  const getName = () => {
    if(!localStorage.getItem('token')) {
      return 
    }

    const token = localStorage.getItem('token');
    console.log("Token w StartWindowSupervisor",token);
    const decodedToken = jwtDecode(token);
    console.log("DecodedToken w StartWindowSupervisor",decodedToken);
    return decodedToken.imie ?? ''
  }

  useEffect(() => {
    const fetchAmountOfUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/get-amount-of-users', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        console.log('Pobrana liczba użytkowników:', data);
        setAmountOfUsers(data.length > 0 ? data[0].count : 0);
      } catch (error) {
        console.error('Błąd przy pobieraniu liczby użytkowników: ', error);
        // Możesz dostosować obsługę błędów, np. ustawienie wartości domyślnej
        setAmountOfUsers(0);
      }
    };

    const fetchAmountOfStudents = async () => {
      try {
        const response = await fetch('http://localhost:3001/get-amount-of-students', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        console.log('Pobrana liczba studentów:', data);
        setAmountOfStudents(data.length > 0 ? data[0].count : 0);
      } catch (error) {
        console.error('Błąd przy pobieraniu liczby studentów: ', error);
        setAmountOfStudents(0);
      }
    };

    const fetchAmountOfSupervisors = async () => {
      try {
        const response = await fetch('http://localhost:3001/get-amount-of-supervisors', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        console.log('Pobrana liczba promotorów:', data);
        setAmountOfSupervisors(data.length > 0 ? data[0].count : 0);
      } catch (error) {
        console.error('Błąd przy pobieraniu liczby promotorów: ', error);
        setAmountOfSupervisors(0);
      }
    };

    const fetchAmountOfTopics = async () => {
      try {
        const response = await fetch('http://localhost:3001/get-amount-of-topics', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        console.log('Pobrana liczba tematów:', data);
        setAmountOfTopics(data.length > 0 ? data[0].count : 0);
      } catch (error) {
        console.error('Błąd przy pobieraniu liczby tematów: ', error);
        setAmountOfTopics(0);
      }
    };

    fetchAmountOfTopics();
    fetchAmountOfSupervisors();
    fetchAmountOfUsers();
    fetchAmountOfStudents();
  }, []);

  return (
    <>
      <div className="start-window-supervisor-container">
        <div className="start-window-supervisor-navbar">
          <SideNavbarSupervisor />
        </div>

        <div className="start-window-supervisor-element">
          <h1>Witaj, {getName()}.</h1>
          <h2>
            Twoja rola to promotor.
            <div className="div-with-tiles-supervisor">
              <div className="sw-tile-supervisor sw-color1-supervisor">
                Ilość użytkowników ogółem
                <div className="sw-amount-supervisor">{amountOfUsers}</div>
              </div>
              <div className="sw-tile-supervisor sw-color2-supervisor">
                Ilość studentów
                <div className="sw-amount-supervisor">{amountOfStudents}</div>
              </div>
              <div className="sw-tile-supervisor sw-color3-supervisor">
                Ilość promotorów
                <div className="sw-amount-supervisor">{amountOfSupervisors}</div>
              </div>
              <div className="sw-tile-supervisor sw-color4-supervisor">
                Ilość tematów
                <div className="sw-amount-supervisor">{amountOfTopics}</div>
              </div>
            </div>
          </h2>
        </div>
      </div>
      <div className="footer-start-window-supervisor">
        <Footer />
      </div>
    </>
  );
};
