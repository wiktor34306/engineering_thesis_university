import React, { useState, useEffect } from 'react';
import './ViewAllTopicsSuperAdminStyle.css';
import { Footer } from '../../Footer/Footer';
import { SideNavbarSuperAdmin } from '../SideNavbarSuperAdmin/SideNavbarSuperAdmin';

export const ViewAllTopicsSuperAdmin = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = () => {
    fetch("http://localhost:3001/get-topics", {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTopics(data);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania tematów: ', error);
      });
  };

  return (
    <>
      <div className="topics-super-admin-container">
        <div className="topics-super-admin-navbar">
          <SideNavbarSuperAdmin />
        </div>
        <div className="topics-super-admin-element">
          <h1>Zobacz wszystkie tematy</h1>
          <table className="styled-table-with-topics">
            <thead>
              <tr>
                <th>lp.</th>
                <th>temat</th>
                <th>promotor</th>
                <th>katedra</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic, index) => (
                <tr key={topic.id_tematu}>
                  <td>{index + 1}</td>
                  <td>{topic.temat}</td>
                  <td>{`${topic.stopien_naukowy} ${topic.imie} ${topic.nazwisko}`}</td>
                  <td>{topic.nazwa_katedry}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit">Generuj kartę zgłoszenia tematu</button>
          <button type="submit">Generuj plik CSV z podziałem na studentów i tematy</button>
        </div>
      </div>

      <div className="footer-topics-super-admin">
        <Footer />
      </div>
    </>
  );
};
