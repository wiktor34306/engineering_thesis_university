import React, { useState, useEffect } from 'react';
import './ViewAllUsersAdminStyle.css';
import { SideNavbarAdmin } from '../SideNavbarAdmin/SideNavbarAdmin';
import { Footer } from '../../Footer/Footer';

export const ViewAllUsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch('http://localhost:3001/get-users', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }) 
      .then((response) => response.json())
      .then((data) => {
        console.log("Dane wczytane",data);
        setUsers(data);
      })
      .catch((error) => {
        console.error('Błąd pobierania danych: ', error);
      });
  };
  
  const filteredUsers = users.filter(user =>
    user.imie.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nazwisko.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="viewusers-admin-container">
        <div className="viewusers-admin-navbar">
          <SideNavbarAdmin />
        </div>

        <div className="viewusers-admin-element">
          <h1>Zobacz wszystkich użytkowników</h1>

          <div className="viewusers-search">
            <label>Wyszukaj:</label>
            <input
              type="text"
              className="input-search-style-viewallusers"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="viewusers-table-all-users">
            <table className="viewusers-table">
              <thead>
                <tr>
                  <th>Id użytkownika</th>
                  <th>Imię</th>
                  <th>Nazwisko</th>
                  <th>Adres e-mail</th>
                  <th>Rola</th>
                  <th>Status</th>
                  <th>Usuwanie</th>
                  <th>Edycja</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id_uzytkownika} className="viewusers-tr">
                    <td className="viewusers-td">{user.id_uzytkownika}</td>
                    <td className="viewusers-td">{user.imie}</td>
                    <td className="viewusers-td">{user.nazwisko}</td>
                    <td className="viewusers-td">{user.adres_email}</td>
                    <td className="viewusers-td">{user.rola}</td>
                    <td className="viewusers-td">{user.aktywny}</td>
                    <td className="viewusers-td">Usuń</td>
                    <td className="viewusers-td">Edytuj</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="footer-viewusers-admin">
        <Footer />
      </div>
    </>
  );
};
