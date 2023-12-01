import React, {useState} from 'react';
import './DocumentsWorkerStyle.css';
import {SideNavbarWorker} from '../SideNavbarWorker/SideNavbarWorker';
import {Footer} from '../../Footer/Footer';
import { HiArrowDownTray } from 'react-icons/hi2';
import { RiArrowDownDoubleLine } from 'react-icons/ri';
import { RiArrowUpDoubleFill } from 'react-icons/ri';

export const DocumentsWorker = () => {
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
        <div className="documents-worker-container">
          <div className="documents-worker-navbar">
            <SideNavbarWorker />
          </div>
  
          <div className="documents-worker-element">
            <h1>Dokumenty</h1>
  
            <div className="div-with-list-of-documents-worker">
              {documents.map((document, index) => (
                <div
                  key={index}
                  className={`documents-worker-item ${expandedItems[index] ? 'expanded' : ''}`}
                >
                  <table className="documents-table-worker">
                    <thead className="documents-thead-worker">
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
                  <div className="documents-expand-button-worker" onClick={() => toggleExpand(index)}>
                    {expandedItems[index] ? <RiArrowUpDoubleFill size={32}/> : < RiArrowDownDoubleLine size={32} />}
                  </div>
                  {expandedItems[index] && (
                    <div className="documents-download-link-worker">
                      <a href="#">< HiArrowDownTray /> Pobierz dokument</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <div className="footer-documents-worker">
          <Footer />
        </div>
      </>
    );
  };
