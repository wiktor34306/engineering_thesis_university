import React, { useState, useEffect } from 'react';
import './ViewAllUsersSuperAdminStyle.css';
import { Footer } from '../../Footer/Footer';
import { SideNavbarSuperAdmin } from '../SideNavbarSuperAdmin/SideNavbarSuperAdmin';

export const ViewAllUsersSuperAdmin = () => {
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
      <div className="viewusers-super-admin-container">
        <div className="viewusers-super-admin-navbar">
          <SideNavbarSuperAdmin />
        </div>

        <div className="viewusers-super-admin-element">
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
            <table className="viewusers-table-superadmin">
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
                  <tr key={user.id_uzytkownika} className="viewusers-tr-superadmin">
                    <td className="viewusers-td-superadmin">{user.id_uzytkownika}</td>
                    <td className="viewusers-td-superadmin">{user.imie}</td>
                    <td className="viewusers-td-superadmin">{user.nazwisko}</td>
                    <td className="viewusers-td-superadmin">{user.adres_email}</td>
                    <td className="viewusers-td-superadmin">{user.rola}</td>
                    <td className="viewusers-td-superadmin">{user.aktywny}</td>
                    <td className="viewusers-td-superadmin">Usuń</td>
                    <td className="viewusers-td-superadmin">Edytuj</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="footer-viewusers-super-admin">
        <Footer />
      </div>
    </>
  );
};
