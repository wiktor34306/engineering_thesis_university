import React, {useState} from 'react';
import './DocumentsSupervisorStyle.css';
import {Footer} from '../../Footer/Footer';
import { HiArrowDownTray } from 'react-icons/hi2';
import { RiArrowDownDoubleLine } from 'react-icons/ri';
import { RiArrowUpDoubleFill } from 'react-icons/ri';
import { SideNavbarSupervisor } from '../SideNavbarSupervisor/SideNavbarSupervisor';

export const DocumentsSupervisor = () => {
    // Tworzymy stan, aby śledzić, który element jest rozwinięty
    const [expandedItems, setExpandedItems] = useState({});
  
    // Funkcja do przełączania stanu elementu
    const toggleExpand = (index) => {
      setExpandedItems((prevExpandedItems) => {
        return { ...prevExpandedItems, [index]: !prevExpandedItems[index] };
      });
    };
  
    // Tworzymy przykładowe dane dokumentów
    const documents = [
      {
        name: 'Nazwa Dokumentu 1',
        creationDate: '2023-10-19',
        author: 'Mateusz Ptak',
      },
      {
        name: 'Nazwa Dokumentu 2',
        creationDate: '2023-10-4',
        author: 'Mateusz Ptak',
      },
      // Dodaj więcej dokumentów według potrzeb
    ];
  
    return (
      <>
        <div className="documents-supervisor-container">
          <div className="documents-supervisor-navbar">
            <SideNavbarSupervisor />
          </div>
  
          <div className="documents-supervisor-element">
            <h1>Dokumenty</h1>
  
            <div className="div-with-list-of-documents">
              {documents.map((document, index) => (
                <div
                  key={index}
                  className={`documents-supervisor-item ${expandedItems[index] ? 'expanded' : ''}`}
                >
                  <table className="documents-table">
                    <thead className="documents-thead">
                      <tr>
                        <th>Nazwa</th>
                        <th>Data utworzenia</th>
                        <th>Autor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{document.name}</td>
                        <td>{document.creationDate}</td>
                        <td>{document.author}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="documents-expand-button" onClick={() => toggleExpand(index)}>
                    {expandedItems[index] ? <RiArrowUpDoubleFill size={32}/> : < RiArrowDownDoubleLine size={32} />}
                  </div>
                  {expandedItems[index] && (
                    <div className="documents-download-link">
                      <a href="#">< HiArrowDownTray /> Pobierz dokument</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <div className="footer-documents-supervisor">
          <Footer />
        </div>
      </>
    );
  };
