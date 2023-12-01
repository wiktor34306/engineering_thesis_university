import React from 'react';
import './SettingsSupervisorStyle.css';
import {Footer} from '../../Footer/Footer';
import { SideNavbarSupervisor } from '../SideNavbarSupervisor/SideNavbarSupervisor';

export const SettingsSupervisor = () => {
    return (
      <>
        <div className="settings-supervisor-container">
          <div className="settings-supervisor-navbar">
            <SideNavbarSupervisor />
          </div>
  
          <div className="settings-supervisor-element">
            <h1>Ustawienia</h1>
            <button>Zmień hasło użytkownika</button>
          </div>
        </div>
  
        <div className="footer-settings-supervisor">
          <Footer />
        </div>
      </>
    );
  };