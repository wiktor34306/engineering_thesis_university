import React, { useEffect, useState } from 'react';
import './StartWindowStudentStyle.css';
import { Footer } from '../../Footer/Footer';
import { jwtDecode } from "jwt-decode";
import { SideNavbarStudent } from '../SideNavbarStudent/SideNavbarStudent';

export const StartWindowStudent = () => {
  const [amountOfUsers, setAmountOfUsers] = useState(0);
  const [amountOfStudents, setAmountOfStudents] = useState(0);
  const [amountOfSupervisors, setAmountOfSupervisors] = useState(0);
  const [amountOfTopics, setAmountOfTopics] = useState(0);

  const getName = () => {
    if(!localStorage.getItem('token')) {
      return 
    }

    const token = localStorage.getItem('token');
    console.log("Token w StartWindowStudent",token);
    const decodedToken = jwtDecode(token);
    console.log("DecodedToken w StartWindowStudent",decodedToken);
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
      <div className="start-window-student-container">
        <div className="start-window-student-navbar">
          <SideNavbarStudent />
        </div>

        <div className="start-window-student-element">
          <h1>Witaj, {getName()}.</h1>
          <h2>
            Twoja rola to student.
            <div className="div-with-tiles-student">
              {/* Twoim promotorem jest .... */}
              <div className="sw-tile-student sw-color1-student">
                Ilość użytkowników ogółem
                <div className="sw-amount-student">{amountOfUsers}</div>
              </div>
              <div className="sw-tile-student sw-color2-student">
                Ilość studentów
                <div className="sw-amount-student">{amountOfStudents}</div>
              </div>
              <div className="sw-tile-student sw-color3-student">
                Ilość promotorów
                <div className="sw-amount-student">{amountOfSupervisors}</div>
              </div>
              <div className="sw-tile-student sw-color4-student">
                Ilość tematów
                <div className="sw-amount-student">{amountOfTopics}</div>
              </div>
            </div>
          </h2>
        </div>
      </div>
      <div className="footer-start-window-student">
        <Footer />
      </div>
    </>
  );
};
