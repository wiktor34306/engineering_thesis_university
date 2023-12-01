import React, { useEffect, useState } from 'react';
import './StartWindowSuperAdminStyle.css';
import { SideNavbarSuperAdmin } from '../SideNavbarSuperAdmin/SideNavbarSuperAdmin';
import { Footer } from '../../Footer/Footer';
import { jwtDecode } from "jwt-decode";

export const StartWindowSuperAdmin = () => {
  const [amountOfUsers, setAmountOfUsers] = useState(0);
  const [amountOfStudents, setAmountOfStudents] = useState(0);
  const [amountOfSupervisors, setAmountOfSupervisors] = useState(0);
  const [amountOfTopics, setAmountOfTopics] = useState(0);
  
  const getName = () => {
    if(!localStorage.getItem('token')) {
      return 
    }

    const token = localStorage.getItem('token');
    console.log("Token w StartWindowWorker",token);
    const decodedToken = jwtDecode(token);
    console.log("DecodedToken w StartWindowWorker",decodedToken);
    return decodedToken.imie ?? ''
  }

  const checkTopicsAndStudents = () => {
    if (amountOfTopics < amountOfStudents) {
      return (
        <div className="sw-tile-super-admin sw-color4-super-admin">
          <div style={{ color: 'red' }}>Uwaga: Jest mniej tematów niż studentów!</div>
        </div>
      );
    }
    return null;
  };

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
      <div className="start-window-super-admin-container">
        <div className="start-window-super-admin-navbar">
          <SideNavbarSuperAdmin />
        </div>

        <div className="start-window-super-admin-element">
          <h1>Witaj, {getName()}.</h1>
          <h2>
            Twoja rola to superadministrator.
            <div className="div-with-tiles-super-admin">
              <div className="sw-tile-super-admin sw-color1-super-admin">
                Ilość użytkowników ogółem
                <div className="sw-amount-super-admin">{amountOfUsers}</div>
              </div>
              <div className="sw-tile-super-admin sw-color2-super-admin">
                Ilość studentów
                <div className="sw-amount-super-admin">{amountOfStudents}</div>
              </div>
              <div className="sw-tile-super-admin sw-color3-super-admin">
                Ilość promotorów
                <div className="sw-amount-super-admin">{amountOfSupervisors}</div>
              </div>
              <div className="sw-tile-super-admin sw-color4-super-admin">
                Ilość tematów
                <div className="sw-amount-super-admin">{amountOfTopics}</div>
              </div>
            </div>
          </h2>
        </div>
      </div>
      <div className="footer-start-window-super-admin">
        <Footer />
      </div>
    </>
  );
};
