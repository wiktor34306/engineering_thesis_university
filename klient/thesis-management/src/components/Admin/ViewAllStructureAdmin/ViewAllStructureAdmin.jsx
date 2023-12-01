import React, { useState, useEffect } from 'react';
import { RiArrowUpDoubleFill, RiArrowDownDoubleLine } from 'react-icons/ri';
import './ViewAllStructureAdminStyle.css';
import { SideNavbarAdmin } from '../SideNavbarAdmin/SideNavbarAdmin';
import { Footer } from '../../Footer/Footer';

export const ViewAllStructureAdmin = () => {
  const [departments, setDepartments] = useState([]);
  const [academicDepartments, setAcademicDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    departments: false,
    academicDepartments: false,
    subjects: false,
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:3001/get-departments', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        const data = await response.json();
        console.log('Pobrane wydziały:', data);
        setDepartments(data);
      } catch (error) {
        console.error('Błąd przy pobieraniu wydziałów: ', error);
      }
    };

    const fetchAcademicDepartments = async () => {
      try {
        const response = await fetch('http://localhost:3001/get-academic-departments', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        const data = await response.json();
        console.log('Pobrane katedry:', data);
        setAcademicDepartments(data);
      } catch (error) {
        console.error('Błąd przy pobieraniu katedr: ', error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/get-subjects', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        const data = await response.json();
        console.log('Pobrane kierunki studiów:', data);
        setSubjects(data);
      } catch (error) {
        console.error('Błąd przy pobieraniu kierunków studiów: ', error);
      }
    };

    fetchDepartments();
    fetchAcademicDepartments();
    fetchSubjects();
  }, []);

  const handleSectionToggle = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      <div className="viewallstructure-admin-container">
        <div className="viewallstructure-admin-navbar">
          <SideNavbarAdmin />
        </div>

        <div className="viewallstructure-admin-element">
          <h1>Zobacz strukturę uczelni</h1>
          <ul className="div-with-list-of-viewallstructure">
            <li className="viewallstructure-admin-item">
              <strong>Wydział:</strong>
              <div onClick={() => handleSectionToggle('departments')} className="viewallstructure-expand-button">
                {expandedSections.departments ? <RiArrowUpDoubleFill /> : <RiArrowDownDoubleLine />}
              </div>
              {expandedSections.departments && (
                <ul>
                  {departments.map((department) => (
                    <li key={department.id_wydzialu}>
                      {department.nazwa}
                      <div className="viewallstructure-expand-button">
                        <button type="submit" className="viewallstructure-function-button viewallstructure-function-button-edit">Edytuj</button>
                        <button type="submit" className="viewallstructure-function-button viewallstructure-function-button-delete">Usuń</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="viewallstructure-admin-item">
              <strong>Katedra:</strong>
              <div onClick={() => handleSectionToggle('academicDepartments')} className="viewallstructure-expand-button">
                {expandedSections.academicDepartments ? <RiArrowUpDoubleFill /> : <RiArrowDownDoubleLine />}
              </div>
              {expandedSections.academicDepartments && (
                <ul>
                  {academicDepartments.map((academicDepartment) => (
                    <li key={academicDepartment.id_katedry}>
                      {academicDepartment.nazwa}
                      <div className="viewallstructure-expand-button">
                        <button type="submit" className="viewallstructure-function-button viewallstructure-function-button-edit">Edytuj</button>
                        <button type="submit" className="viewallstructure-function-button viewallstructure-function-button-delete">Usuń</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="viewallstructure-admin-item">
              <strong>Kierunek:</strong>
              <div onClick={() => handleSectionToggle('subjects')} className="viewallstructure-expand-button">
                {expandedSections.subjects ? <RiArrowUpDoubleFill /> : <RiArrowDownDoubleLine />}
              </div>
              {expandedSections.subjects && (
                <ul>
                  {subjects.map((subject) => (
                    <li key={subject.id_kierunku}>
                      {subject.nazwa}
                      <div className="viewallstructure-expand-button">
                        <button type="submit" className="viewallstructure-function-button viewallstructure-function-button-edit">Edytuj</button>
                        <button type="submit" className="viewallstructure-function-button viewallstructure-function-button-delete">Usuń</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-viewallstructure-admin">
        <Footer />
      </div>
    </>
  );
};

