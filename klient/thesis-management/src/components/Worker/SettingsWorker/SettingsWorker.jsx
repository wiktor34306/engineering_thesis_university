import React from 'react';
import './SettingsWorkerStyle.css';
import {Footer} from '../../Footer/Footer';
import { SideNavbarWorker } from '../SideNavbarWorker/SideNavbarWorker';

export const SettingsWorker = () => {
    return (
      <>
        <div className="settings-worker-container">
          <div className="settings-worker-navbar">
            <SideNavbarWorker />
          </div>
  
          <div className="settings-worker-element">
            <h1>Ustawienia</h1>
            <button>Zmień hasło użytkownika</button>
          </div>
        </div>
  
        <div className="footer-settings-worker">
          <Footer />
        </div>
      </>
    );
  };