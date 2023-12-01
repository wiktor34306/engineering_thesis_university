// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Login } from './components/Login/Login';
// import { DocumentsAdmin } from './components/Admin/DocumentsAdmin/DocumentsAdmin';
// import { SettingsAdmin } from './components/Admin/SettingsAdmin/SettingsAdmin';
// import { StartWindowAdmin } from './components/Admin/StartWindowAdmin/StartWindowAdmin';
// import { SupervisorRegistrationFormModalAdmin } from './components/Admin/SupervisorRegistrationFormModalAdmin/SupervisorRegistrationFormModalAdmin';
// import { WorkerRegistrationFormModalAdmin } from './components/Admin/WorkerRegistrationFormModalAdmin/WorkerRegistrationFormModalAdmin';
// import { AddingTopicFormModalAdmin } from './components/Admin/AddingTopicFormModalAdmin/AddingTopicFormModalAdmin';
// import { ViewAllUsersAdmin } from './components/Admin/ViewAllUsersAdmin/ViewAllUsersAdmin';
// import { ViewAllTopicsAdmin } from './components/Admin/ViewAllTopicsAdmin/ViewAllTopicsAdmin';
// import { AddingSubjectFormModalAdmin } from './components/Admin/AddingSubjectFormModalAdmin/AddingSubjectFormModalAdmin';
// import { AddingAcademicDepartmentFormModalAdmin } from './components/Admin/AddingAcademicDepartmentFormModalAdmin/AddingAcademicDepartmentFormModalAdmin';
// import { AddingDepartmentFormModalAdmin } from './components/Admin/AddingDepartmentFormModalAdmin/AddingDepartmentFormModalAdmin';
// import { ViewAllStructureAdmin } from './components/Admin/ViewAllStructureAdmin/ViewAllStructureAdmin';
// import { StartWindowWorker } from './components/Worker/StartWindowWorker/StartWindowWorker';
// import { DocumentsWorker } from './components/Worker/DocumentsWorker/DocumentsWorker';
// import { StudentRegistrationFormModalAdmin } from './components/Admin/StudentRegistrationFormModalAdmin/StudentRegistrationFormModalAdmin';
// import { AddingAcademicDepartmentFormModalSuperAdmin } from './components/Superadmin/AddingAcademicDepartmentFormModalSuperAdmin/AddingAcademicDepartmentFormModalSuperAdmin';
// import { StartWindowSuperAdmin } from './components/Superadmin/StartWindowSuperAdmin/StartWindowSuperAdmin';
// import { AddingDepartmentFormModalSuperAdmin } from './components/Superadmin/AddingDepartmentFormModalSuperAdmin/AddingDepartmentFormModalSuperAdmin';
// import { AddingSubjectFormModalSuperAdmin } from './components/Superadmin/AddingSubjectFormModalSuperAdmin/AddingSubjectFormModalSuperAdmin';
// import { AddingTopicFormModalSuperAdmin } from './components/Superadmin/AddingTopicFormModalSuperAdmin/AddingTopicFormModalSuperAdmin';
// import { DocumentsSuperAdmin } from './components/Superadmin/DocumentsSuperAdmin/DocumentsSuperAdmin';
// import { SettingsSuperAdmin } from './components/Superadmin/SettingsSuperAdmin/SettingsSuperAdmin';
// import { StudentRegistrationFormModalSuperAdmin } from './components/Superadmin/StudentRegistrationFormModalSuperAdmin/StudentRegistrationFormModalSuperAdmin';
// import { SupervisorRegistrationFormModalSuperAdmin } from './components/Superadmin/SupervisorRegistrationFormModalSuperAdmin/SupervisorRegistrationFormModalSuperAdmin';
// import { ViewAllStructureSuperAdmin } from './components/Superadmin/ViewAllStructureSuperAdmin/ViewAllStructureSuperAdmin';
// import { ViewAllTopicsSuperAdmin } from './components/Superadmin/ViewAllTopicsSuperAdmin/ViewAllTopicsSuperAdmin';
// import { ViewAllUsersSuperAdmin } from './components/Superadmin/ViewAllUsersSuperAdmin/ViewAllUsersSuperAdmin';
// import { WorkerRegistrationFormModalSuperAdmin } from './components/Superadmin/WorkerRegistrationFormModalSuperAdmin/WorkerRegistrationFormModalSuperAdmin';
// import { StartWindowStudent } from './components/Student/StartWindowStudent/StartWindowStudent';
// import { SideNavbarStudent } from './components/Student/SideNavbarStudent/SideNavbarStudent';
// import { ViewAllTopicsStudent } from './components/Student/ViewAllTopicsStudent/ViewAllTopicsStudent';
// import { SettingsStudent } from './components/Student/SettingsStudent/SettingsStudent';
// import { SettingsWorker } from './components/Worker/SettingsWorker/SettingsWorker';
// import { SideNavbarSupervisor } from './components/Supervisor/SideNavbarSupervisor/SideNavbarSupervisor';
// import { AddingTopicFormModalSupervisor } from './components/Supervisor/AddingTopicFormModalSupervisor/AddingTopicFormModalSupervisor';
// import { DocumentsSupervisor } from './components/Supervisor/DocumentsSupervisor/DocumentsSupervisor';
// import { SettingsSupervisor } from './components/Supervisor/SettingsSupervisor/SettingsSupervisor';
// import { StartWindowSupervisor } from './components/Supervisor/StartWindowSupervisor/StartWindowSupervisor';
// import { ViewAllTopicsSupervisor } from './components/Supervisor/ViewAllTopicsSupervisor/ViewAllTopicsSupervisor';
// import { AdminRegistrationFormModal } from './components/Superadmin/AdminRegistrationFormModal/AdminRegistrationFormModal';

// const App = () => {
//   return (
//       <BrowserRouter>
//         <Routes>
//         <Route path="/" element={<Login />} />

//         {/*Superadministrator*/}
//         <Route path="/addingacademicdepartmentformmodalsuperadmin" element={<AddingAcademicDepartmentFormModalSuperAdmin />} />
//         <Route path="/adminregistrationformmodal" element={<AdminRegistrationFormModal />} />
//         <Route path="/addingdepartmentformmodalsuperadmin" element={< AddingDepartmentFormModalSuperAdmin  />} />
//         <Route path="/addingsubjectformmodalsuperadmin" element={< AddingSubjectFormModalSuperAdmin  />} />
//         <Route path="/addingtopicformmodalsuperadmin" element={< AddingTopicFormModalSuperAdmin  />} />
//         <Route path="/documentssuperadmin" element={< DocumentsSuperAdmin  />} />
//         <Route path="/settingssuperadmin" element={< SettingsSuperAdmin  />} />
//         <Route path="/startwindowsuperadmin" element={< StartWindowSuperAdmin  />} />
//         <Route path="/studentregistrationformmodalsuperadmin" element={< StudentRegistrationFormModalSuperAdmin  />} />
//         <Route path="/supervisorregistrationformmodalsuperadmin" element={< SupervisorRegistrationFormModalSuperAdmin  />} />
//         <Route path="/viewallstructuresuperadmin" element={< ViewAllStructureSuperAdmin  />} />
//         <Route path="/viewalltopicssuperadmin" element={< ViewAllTopicsSuperAdmin  />} />
//         <Route path="/viewalluserssuperadmin" element={< ViewAllUsersSuperAdmin  />} />
//         <Route path="/workerregistrationformmodalsuperadmin" element={< WorkerRegistrationFormModalSuperAdmin  />} />


//         {/*Administrator*/}
//         <Route path="/documentsadmin" element={<DocumentsAdmin />} />
//         <Route path="/settingsadmin" element={<SettingsAdmin />} />
//         <Route path="/startwindowadmin" element={<StartWindowAdmin />} />
//         <Route path="/studentregistrationformmodaladmin" element={<StudentRegistrationFormModalAdmin />} />
//         <Route path="/supervisorregistrationformmodaladmin" element={<SupervisorRegistrationFormModalAdmin />} />
//         <Route path="/workerregistrationformmodaladmin" element={<WorkerRegistrationFormModalAdmin />} />
//         <Route path="/addingtopicformmodaladmin" element={<AddingTopicFormModalAdmin />} />
//         <Route path="/viewallusersadmin" element={<ViewAllUsersAdmin />} />
//         <Route path="/viewalltopicsadmin" element={<ViewAllTopicsAdmin />} />
//         <Route path="/addingsubjectformmodaladmin" element={<AddingSubjectFormModalAdmin />} />
//         <Route path="/addingacademicdepartmentformmodaladmin" element={<AddingAcademicDepartmentFormModalAdmin />} />
//         <Route path="/addingdepartmentformmodaladmin" element={<AddingDepartmentFormModalAdmin />} />
//         <Route path="/viewallstructureadmin" element={<ViewAllStructureAdmin />} />

//         {/*Promotor*/}
//         <Route path="/sidenavbarsupervisor" element={<SideNavbarSupervisor />} />
//         <Route path="/addingtopicformmodalsupervisor" element={<AddingTopicFormModalSupervisor />} />
//         <Route path="/documentssupervisor" element={<DocumentsSupervisor />} />
//         <Route path="/settingssupervisor" element={<SettingsSupervisor />} />
//         <Route path="/startwindowsupervisor" element={<StartWindowSupervisor />} />
//         <Route path="/viewalltopicssupervisor" element={<ViewAllTopicsSupervisor />} />

//         {/*Student*/}
//         <Route path="/startwindowstudent" element={<StartWindowStudent />} />
//         <Route path="/sidenavbarstudent" element={<SideNavbarStudent />} />
//         <Route path="/viewalltopicsstudent" element={<ViewAllTopicsStudent />} />
//         <Route path="/settingsstudent" element={<SettingsStudent />} />

//         {/*Pracownik*/}
//         <Route path="/startwindowworker" element={<StartWindowWorker />} />
//         <Route path="/documentsworker" element={<DocumentsWorker />} />
//         <Route path="/settingsworker" element={<SettingsWorker />} />
        
//         </Routes>
//         <ToastContainer />
//       </BrowserRouter>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './components/Login/Login';
import { DocumentsAdmin } from './components/Admin/DocumentsAdmin/DocumentsAdmin';
import { SettingsAdmin } from './components/Admin/SettingsAdmin/SettingsAdmin';
import { StartWindowAdmin } from './components/Admin/StartWindowAdmin/StartWindowAdmin';
import { SupervisorRegistrationFormModalAdmin } from './components/Admin/SupervisorRegistrationFormModalAdmin/SupervisorRegistrationFormModalAdmin';
import { WorkerRegistrationFormModalAdmin } from './components/Admin/WorkerRegistrationFormModalAdmin/WorkerRegistrationFormModalAdmin';
import { AddingTopicFormModalAdmin } from './components/Admin/AddingTopicFormModalAdmin/AddingTopicFormModalAdmin';
import { ViewAllUsersAdmin } from './components/Admin/ViewAllUsersAdmin/ViewAllUsersAdmin';
import { ViewAllTopicsAdmin } from './components/Admin/ViewAllTopicsAdmin/ViewAllTopicsAdmin';
import { AddingSubjectFormModalAdmin } from './components/Admin/AddingSubjectFormModalAdmin/AddingSubjectFormModalAdmin';
import { AddingAcademicDepartmentFormModalAdmin } from './components/Admin/AddingAcademicDepartmentFormModalAdmin/AddingAcademicDepartmentFormModalAdmin';
import { AddingDepartmentFormModalAdmin } from './components/Admin/AddingDepartmentFormModalAdmin/AddingDepartmentFormModalAdmin';
import { ViewAllStructureAdmin } from './components/Admin/ViewAllStructureAdmin/ViewAllStructureAdmin';
import { StartWindowWorker } from './components/Worker/StartWindowWorker/StartWindowWorker';
import { DocumentsWorker } from './components/Worker/DocumentsWorker/DocumentsWorker';
import { StudentRegistrationFormModalAdmin } from './components/Admin/StudentRegistrationFormModalAdmin/StudentRegistrationFormModalAdmin';
import { AddingAcademicDepartmentFormModalSuperAdmin } from './components/Superadmin/AddingAcademicDepartmentFormModalSuperAdmin/AddingAcademicDepartmentFormModalSuperAdmin';
import { StartWindowSuperAdmin } from './components/Superadmin/StartWindowSuperAdmin/StartWindowSuperAdmin';
import { AddingDepartmentFormModalSuperAdmin } from './components/Superadmin/AddingDepartmentFormModalSuperAdmin/AddingDepartmentFormModalSuperAdmin';
import { AddingSubjectFormModalSuperAdmin } from './components/Superadmin/AddingSubjectFormModalSuperAdmin/AddingSubjectFormModalSuperAdmin';
import { AddingTopicFormModalSuperAdmin } from './components/Superadmin/AddingTopicFormModalSuperAdmin/AddingTopicFormModalSuperAdmin';
import { DocumentsSuperAdmin } from './components/Superadmin/DocumentsSuperAdmin/DocumentsSuperAdmin';
import { SettingsSuperAdmin } from './components/Superadmin/SettingsSuperAdmin/SettingsSuperAdmin';
import { StudentRegistrationFormModalSuperAdmin } from './components/Superadmin/StudentRegistrationFormModalSuperAdmin/StudentRegistrationFormModalSuperAdmin';
import { SupervisorRegistrationFormModalSuperAdmin } from './components/Superadmin/SupervisorRegistrationFormModalSuperAdmin/SupervisorRegistrationFormModalSuperAdmin';
import { ViewAllStructureSuperAdmin } from './components/Superadmin/ViewAllStructureSuperAdmin/ViewAllStructureSuperAdmin';
import { ViewAllTopicsSuperAdmin } from './components/Superadmin/ViewAllTopicsSuperAdmin/ViewAllTopicsSuperAdmin';
import { ViewAllUsersSuperAdmin } from './components/Superadmin/ViewAllUsersSuperAdmin/ViewAllUsersSuperAdmin';
import { WorkerRegistrationFormModalSuperAdmin } from './components/Superadmin/WorkerRegistrationFormModalSuperAdmin/WorkerRegistrationFormModalSuperAdmin';
import { StartWindowStudent } from './components/Student/StartWindowStudent/StartWindowStudent';
import { SideNavbarStudent } from './components/Student/SideNavbarStudent/SideNavbarStudent';
import { ViewAllTopicsStudent } from './components/Student/ViewAllTopicsStudent/ViewAllTopicsStudent';
import { SettingsStudent } from './components/Student/SettingsStudent/SettingsStudent';
import { SettingsWorker } from './components/Worker/SettingsWorker/SettingsWorker';
import { SideNavbarSupervisor } from './components/Supervisor/SideNavbarSupervisor/SideNavbarSupervisor';
import { AddingTopicFormModalSupervisor } from './components/Supervisor/AddingTopicFormModalSupervisor/AddingTopicFormModalSupervisor';
import { DocumentsSupervisor } from './components/Supervisor/DocumentsSupervisor/DocumentsSupervisor';
import { SettingsSupervisor } from './components/Supervisor/SettingsSupervisor/SettingsSupervisor';
import { StartWindowSupervisor } from './components/Supervisor/StartWindowSupervisor/StartWindowSupervisor';
import { ViewAllTopicsSupervisor } from './components/Supervisor/ViewAllTopicsSupervisor/ViewAllTopicsSupervisor';
import { AdminRegistrationFormModal } from './components/Superadmin/AdminRegistrationFormModal/AdminRegistrationFormModal';
import { getUserRole } from './getUserRole';

const App = () => {
  const { role } = getUserRole();
  const hasAccess = (allowedRoles) => allowedRoles.includes(role);
  
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />

   {/* Superadministrator */}
        <Route path="/addingacademicdepartmentformmodalsuperadmin" element={<AddingAcademicDepartmentFormModalSuperAdmin />} />
        <Route path="/adminregistrationformmodal" element={<AdminRegistrationFormModal />} />
        <Route path="/addingdepartmentformmodalsuperadmin" element={< AddingDepartmentFormModalSuperAdmin  />} />
        <Route path="/addingsubjectformmodalsuperadmin" element={< AddingSubjectFormModalSuperAdmin  />} />
        <Route path="/addingtopicformmodalsuperadmin" element={< AddingTopicFormModalSuperAdmin  />} />
        <Route path="/documentssuperadmin" element={< DocumentsSuperAdmin  />} />
        <Route path="/settingssuperadmin" element={< SettingsSuperAdmin  />} />
        <Route path="/startwindowsuperadmin" element={< StartWindowSuperAdmin  />} />
        <Route path="/studentregistrationformmodalsuperadmin" element={< StudentRegistrationFormModalSuperAdmin  />} />
        <Route path="/supervisorregistrationformmodalsuperadmin" element={< SupervisorRegistrationFormModalSuperAdmin  />} />
        <Route path="/viewallstructuresuperadmin" element={< ViewAllStructureSuperAdmin  />} />
        <Route path="/viewalltopicssuperadmin" element={< ViewAllTopicsSuperAdmin  />} />
        <Route path="/viewalluserssuperadmin" element={< ViewAllUsersSuperAdmin  />} />
        <Route path="/workerregistrationformmodalsuperadmin" element={< WorkerRegistrationFormModalSuperAdmin  />} />
        

        {/*Administrator*/}
        <Route path="/documentsadmin" element={<DocumentsAdmin />} />
        <Route path="/settingsadmin" element={<SettingsAdmin />} />
        <Route path="/startwindowadmin" element={<StartWindowAdmin />} />
        <Route path="/studentregistrationformmodaladmin" element={<StudentRegistrationFormModalAdmin />} />
        <Route path="/supervisorregistrationformmodaladmin" element={<SupervisorRegistrationFormModalAdmin />} />
        <Route path="/workerregistrationformmodaladmin" element={<WorkerRegistrationFormModalAdmin />} />
        <Route path="/addingtopicformmodaladmin" element={<AddingTopicFormModalAdmin />} />
        <Route path="/viewallusersadmin" element={<ViewAllUsersAdmin />} />
        <Route path="/viewalltopicsadmin" element={<ViewAllTopicsAdmin />} />
        <Route path="/addingsubjectformmodaladmin" element={<AddingSubjectFormModalAdmin />} />
        <Route path="/addingacademicdepartmentformmodaladmin" element={<AddingAcademicDepartmentFormModalAdmin />} />
        <Route path="/addingdepartmentformmodaladmin" element={<AddingDepartmentFormModalAdmin />} />
        <Route path="/viewallstructureadmin" element={<ViewAllStructureAdmin />} />

        {/*Promotor*/}
        <Route path="/sidenavbarsupervisor" element={<SideNavbarSupervisor />} />
        <Route path="/addingtopicformmodalsupervisor" element={<AddingTopicFormModalSupervisor />} />
        <Route path="/documentssupervisor" element={<DocumentsSupervisor />} />
        <Route path="/settingssupervisor" element={<SettingsSupervisor />} />
        <Route path="/startwindowsupervisor" element={<StartWindowSupervisor />} />
        <Route path="/viewalltopicssupervisor" element={<ViewAllTopicsSupervisor />} />

        {/*Student*/}
        <Route path="/startwindowstudent" element={<StartWindowStudent />} />
        <Route path="/sidenavbarstudent" element={<SideNavbarStudent />} />
        <Route path="/viewalltopicsstudent" element={<ViewAllTopicsStudent />} />
        <Route path="/settingsstudent" element={<SettingsStudent />} />

        {/*Pracownik*/}
        {hasAccess(["pracownik"]) && (
          <>
        <Route path="/startwindowworker" element={<StartWindowWorker />} />
        <Route path="/documentsworker" element={<DocumentsWorker />} />
        <Route path="/settingsworker" element={<SettingsWorker />} />
        </>
        )}

        </Routes>
        <ToastContainer />
      </BrowserRouter>
  );
};

export default App;