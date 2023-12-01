import React from 'react';
import './SettingsAdminStyle.css';
import {SideNavbarAdmin} from '../SideNavbarAdmin/SideNavbarAdmin';
import {Footer} from '../../Footer/Footer';

export const SettingsAdmin = () => {
    return (
      <>
        <div className="settings-admin-container">
          <div className="settings-admin-navbar">
            <SideNavbarAdmin />
          </div>
  
          <div className="settings-admin-element">
            <h1>Ustawienia</h1>
            <button>Zmień hasło użytkownika</button>
          </div>
        </div>
  
        <div className="footer-settings-admin">
          <Footer />
        </div>
      </>
    );
  };