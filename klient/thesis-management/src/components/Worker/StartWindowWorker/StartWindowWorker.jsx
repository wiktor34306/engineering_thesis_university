import React from 'react';
import './StartWindowWorkerStyle.css';
import {SideNavbarWorker} from '../SideNavbarWorker/SideNavbarWorker';
import {Footer} from '../../Footer/Footer';
import { jwtDecode } from "jwt-decode";

export const StartWindowWorker = () => {

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

  return (
    <>
    <div className="start-window-worker-container">
      <div className="start-window-worker-navbar">
        <SideNavbarWorker/>
      </div>   
     

      <div className="start-window-worker-element">
        <h1>Witaj, {getName()}.</h1>
        <h2>Twoja rola to pracownik.
          <div className="div-with-tiles-worker">
            <div className="sw-tile-worker sw-color1-worker">Ilość kart zgłoszeń
              <div className="sw-amount-worker">2</div>
            </div>
          </div>
        </h2>

      </div>
    </div>
    <div className="footer-start-window-worker">
        <Footer />
      </div>
    </>
  );
};