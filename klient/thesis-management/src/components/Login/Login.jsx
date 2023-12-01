// import Icon from '../../assets/pics/graduation.png';
// import './LoginStyle.css';
// import React from 'react';
// import {Link } from 'react-router-dom';

// export const Login = () => {
  
//   return (
//     // <div className='login flex-container'>
//     <div className='login-body'>
//     <div className='login-flex-container '>
//         <div id='login-container'>

// <form>
//   <div className="form-group">
//     <label htmlFor="email"></label>
//     <input type="text" className="form-control login-input" name="email" id="email" aria-describedby="emailHelp" placeholder="Adres e-mail" />
//   </div>
//   <div className="form-group">
//     <label htmlFor="password"></label>
//     <input type="password" className="form-control login-input" id="password" placeholder="Hasło" />
//   </div>

//   <div className="login-buttons-div">
//             <Link to="/startwindowadmin"><button type="submit" className="login-button">Zaloguj się</button></Link>
//             <button type="reset" className="login-button">Wyczyść</button>
//  </div>

//           </form>

//         </div>

//         <div id='login-container2'>
//             <img src={Icon} alt="graduationIcon" className='login-icon' />
//         </div>
//     </div>
//     </div>
//   );
// };






// Moja wersja, z fetchem i thenem.

// import Icon from '../../assets/pics/graduation.png';
// import './LoginStyle.css';
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';

// export const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
  
//     console.log('Próba logowania z danymi:', email, password);
  
//     fetch('http://localhost:3001/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         toast.error('Odpowiedź z serwera:', data);
//         console.log('Odpowiedź z serwera:', data);
  
//         // Zapisz token w localStorage
//         localStorage.setItem('token', data.token);
  
//         // Przekieruj użytkownika do strony głównej
//         // Możesz to zrobić za pomocą react-router-dom
//         // history.push('/startwindowadmin');
//       })
//       .catch((error) => {
//         toast.error('Błąd logowania:', error);
//         // console.error('Błąd logowania:', error);
//         // Wyświetl komunikat o błędzie
//       });
//   };

//   return (
//     <div className='login-body'>
//       <div className='login-flex-container '>
//         <div id='login-container'>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="email"></label>
//               <input type="text" className="form-control login-input" name="email" id="email" aria-describedby="emailHelp" placeholder="Adres e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password"></label>
//               <input type="password" className="form-control login-input" id="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
//             </div>
//             <div className="login-buttons-div">
//               <button type="submit" className="login-button">Zaloguj się</button>
//               <button type="reset" className="login-button" onClick={() => {setEmail(''); setPassword('');}}>Wyczyść</button>
//             </div>
//           </form>
//         </div>
//         <div id='login-container2'>
//           <img src={Icon} alt="graduationIcon" className='login-icon' />
//         </div>
//       </div>
//     </div>
//   );
// };




// II wersja

import Icon from '../../assets/pics/graduation.png';
import './LoginStyle.css';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ajax } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { jwtDecode } from "jwt-decode";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    console.log('Próba logowania z danymi:', email, password);
    const loginData = {email, password};
    const login$ = ajax.post('http://localhost:3001/login', loginData, {
      "Content-Type":"application/json",
    })

    login$
      .pipe(
        map((response) => response.response),
        catchError((error) => {
          console.error("Błąd logowania: ", error);
          setError("Nieprawidłowa odpowiedź serwera.");
          return of(null);
        })
      )
      .subscribe((data) => {
        console.log("Wartości data",data);
        if (data) {

          console.log("Token: ", data.token);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userEmail", email);
          const role = jwtDecode(data.token).rola;
          console.log("Wartość role w pliku Login",role);
          switch(role){
            
            case 'superadministrator':
              Navigate("/startwindowsuperadmin");
            break;

            case 'administrator':
              Navigate("/startwindowadmin");
            break;

            case 'student':
              Navigate("/startwindowstudent");
            break;

            case 'promotor':
              Navigate("/startwindowsupervisor");
            break;

            case 'pracownik':
              Navigate("/startwindowworker");
            break;
          }
        }
      });
  
  }

  return (
    <div className='login-body'>
      <div className='login-flex-container '>
        <div id='login-container'>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email"></label>
              <input type="text" className="form-control login-input" name="email" id="email" aria-describedby="emailHelp" placeholder="Adres e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password"></label>
              <input type="password" className="form-control login-input" id="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="login-buttons-div">
              <button type="submit" className="login-button">Zaloguj się</button>
              <button type="reset" className="login-button" onClick={() => {setEmail(''); setPassword('');}}>Wyczyść</button>
            </div>
          </form>
        </div>
        <div id='login-container2'>
          <img src={Icon} alt="graduationIcon" className='login-icon' />
        </div>
      </div>
    </div>
  );
};