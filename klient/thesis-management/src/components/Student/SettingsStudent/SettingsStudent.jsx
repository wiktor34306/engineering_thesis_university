import React from 'react';
import './SettingsStudentStyle.css';
import {Footer} from '../../Footer/Footer';
import { SideNavbarStudent } from '../SideNavbarStudent/SideNavbarStudent';

export const SettingsStudent = () => {
    return (
      <>
        <div className="settings-student-container">
          <div className="settings-student-navbar">
            <SideNavbarStudent />
          </div>
  
          <div className="settings-student-element">
            <h1>Ustawienia</h1>
            <button>Zmień hasło użytkownika</button>
          </div>
        </div>
  
        <div className="footer-settings-student">
          <Footer />
        </div>
      </>
    );
  };