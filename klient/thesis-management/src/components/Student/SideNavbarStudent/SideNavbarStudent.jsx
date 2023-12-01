import React, { useState } from 'react';
import "./SideNavbarStudentStyle.css"
import AcademiaIcon from '../../../assets/pics/logo-akademia-nauk.svg';
import dashboardIcon from '../../../assets/pics/grid.svg';
import messageIcon from '../../../assets/pics/message.svg';
import settingIcon from '../../../assets/pics/settings.svg';
import adminAvatarIcon from '../../../assets/pics/admin-avatar.svg';
import logoutIcon from '../../../assets/pics/logout.svg';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

export const SideNavbarStudent = () => {
    const [isExpanded, setExpandState] = useState(false);
    const [isUserExpanded, setUserExpandState] = useState(false);
    const [isMessageExpanded, setMessageExpandState] = useState(false);
    const [isAdminRegistrationModalOpen, setAdminRegistrationModalOpen] = useState(false);
    const [isStudentRegistrationModalOpen, setStudentRegistrationModalOpen] = useState(false);
    const [isSupervisorRegistrationModalOpen, setSupervisorRegistrationModalOpen] = useState(false);
    const [isWorkerRegistrationModalOpen, setWorkerRegistrationModalOpen] = useState(false);
    const [isAddingTopicModalOpen, setAddingTopicModalOpen] = useState(false);
    const [isAddingDepartmentModalOpen, setAddingDepartmentModalOpen] = useState(false);
    const [isAddingAcademicDepartmentModalOpen, setAddingAcademicDepartmentModalOpen] = useState(false);
    const [isAddingSubjectModalOpen, setAddingSubjectModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const Navigate = useNavigate();

    const getName = () => {
        if(!localStorage.getItem('token')) {
          return 
        }
    
        const token = localStorage.getItem('token');
        console.log("Token w StartWindowStudent",token);
        const decodedToken = jwtDecode(token);
        console.log("DecodedToken w StartWindowStudent",decodedToken);
        return decodedToken.imie ?? ''
      }

    const handleMessageMouseEnter = () => {
        setMessageExpandState(true);
    }

    const handleMessageMouseLeave = () => {
        setMessageExpandState(false);
    }

    const closeAdminRegistrationModal = () => {
        setAdminRegistrationModalOpen(false);
    };

    const closeStudentRegistrationModal = () => {
        setStudentRegistrationModalOpen(false);
    };

    const closeSupervisorRegistrationModal = () => {
        setSupervisorRegistrationModalOpen(false);
    };

    const closeWorkerRegistrationModal = () => {
        setWorkerRegistrationModalOpen(false);
    };

    const closeAddingTopicModal = () => {
        setAddingTopicModalOpen(false);
    };

    const closeAddingDepartmentModal = () => {
        setAddingDepartmentModalOpen(false);
    };

    const closeAddingAcademicDepartmentModal = () => {
        setAddingAcademicDepartmentModalOpen(false);
    };

    const openAddingSubjectModal = () => {
        setAddingSubjectModalOpen(true);
    };

    const closeAddingSubjectModal = () => {
        setAddingSubjectModalOpen(false);
    };

    const handleLogout = async () => {
        try {
            let decodedToken = '';
            const token = localStorage.getItem('token');
            
            if (token) {
                decodedToken = jwtDecode(token);
                setUser(decodedToken);
                console.log("Zdekodowany token w SideNavbarWorker",decodedToken);
            }
    
            console.log("Token w SideNavbarWorker",token);
          
            const id_uzytkownika = decodedToken.id_uzytkownika;
            console.log("SideNavbarWorker id_uzytkownika wartosc",id_uzytkownika);
    
            if (id_uzytkownika) {
                const response = await axios.delete(`http://localhost:3001/logout/${id_uzytkownika}`);
                console.log("Wynik zapytania response",response);
                if (response.status === 202) {
                    console.log('Logout successful');
                    localStorage.removeItem('token'); // Remove the token from local storage
                    Navigate("/"); // Navigate to the login route
                } else {
                    console.error('Logout failed');
                }
            } else {
                console.error('User ID not found or invalid token');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className={`sidenavbar-student-container ${isExpanded ? "sidenavbar-expanded" : "sidenavbar-not-expanded"}`}>
            <div className={`sidenavbar-student-div-with-range-from-beginning-to-username ${isExpanded ? "sidenavbar-student-div-with-range-from-beginning-to-username" : "sidenavbar-student-div-with-range-from-beginning-to-username-not-expanded"}`}>
                <div className="sidenavbar-upper-of-navbar">
                    <div className="sidenavbar-student-heading-of-navbar">
                    {isExpanded && (
                        <div className="sidenavbar-student-nav-brand">
                            <img className="sidenavbar-student-nav-img-appearance" src={AcademiaIcon} alt="" width="150" height="150" />
                        </div>
                    )}

                    <button
                        className={`sidenavbar-student-hamburger-look ${isExpanded ? 'sidenavbar-student-hamburger-look-in' : 'sidenavbar-student-hamburger-look-out'}`}
                        onClick={() => setExpandState(!isExpanded)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                <div className="sidenavbar-student-menu-of-navbar">
                    <ol>
                        <li>
                            <NavLink to="/startwindowstudent" className={`sidenavbar-student-menu-item `}>
                                <img src={dashboardIcon} alt="obrazki" />
                                {isExpanded ? (<p>Start</p>) : (<p className="sidenavbar-student-tooltip">Start</p>)}
                            </NavLink>
                        </li>
                        
                        <li>
                            <div
                                className={`sidenavbar-student-menu-item ${isMessageExpanded ? 'expanded' : ''}`}
                                onMouseEnter={handleMessageMouseEnter}
                                onMouseLeave={handleMessageMouseLeave}
                            >
                                <img src={messageIcon} alt="obrazki" />
                                {isExpanded && <p>Tematy</p>}
                                <ul className={`sidenavbar-student-submenu ${isMessageExpanded ? 'expanded' : ''}`}>
                                    <li>
                                    <NavLink to="/viewalltopicsstudent">
                                <button className="sidenavbar-button">
                                            Przeglądaj tematy
                                        </button>
                            </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <NavLink to="/settingsstudent" className={`sidenavbar-student-menu-item`}>
                                <img src={settingIcon} alt="obrazki" />
                                {isExpanded ? (<p>Ustawienia</p>) : (<p className="sidenavbar-student-tooltip">Ustawienia</p>)}
                            </NavLink>
                        </li>
                    </ol>
                </div>
            </div>
            <div className="sidenavbar-student-down-of-navbars-footer">
            {isExpanded && (
            <div className="sidenavbar-student-div-with-username-and-role">
                <img src={adminAvatarIcon} alt="admin" />
                <div className="sidenavbar-student-down-of-navbars-footer-info">
                <p className="sidenavbar-student-down-of-navbars-footer-user-name">{getName()}</p>
                <p className="sidenavbar-student-down-of-navbars-footer-user-position">Rola: student</p>
                </div>
            </div>
            )}

        <button className="sidenavbar-student-icon-logout-button">
                <Link to="#" className="sidenavbar-student-icon-of-logout" onClick={handleLogout}>
                    <img src={logoutIcon} alt="sidenavbar-student-icon-of-logout" />
                </Link>
            </button>

            </div>
        </div>

        </div>
    );
};
