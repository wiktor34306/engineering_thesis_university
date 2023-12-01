import React from 'react';
import './SettingsSuperAdminStyle.css';
import {Footer} from '../../Footer/Footer';
import { SideNavbarSuperAdmin } from '../SideNavbarSuperAdmin/SideNavbarSuperAdmin';

export const SettingsSuperAdmin = () => {
    return (
      <>
        <div className="settings-super-admin-container">
          <div className="settings-super-admin-navbar">
            <SideNavbarSuperAdmin />
          </div>
  
          <div className="settings-super-admin-element">
            <h1>Ustawienia</h1>
            <button>Zmień hasło użytkownika</button>
          </div>
        </div>
  
        <div className="footer-settings-super-admin">
          <Footer />
        </div>
      </>
    );
  };