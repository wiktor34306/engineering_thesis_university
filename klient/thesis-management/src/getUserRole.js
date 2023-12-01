import { jwtDecode } from 'jwt-decode';

export const getUserRole = () => {
    if (!localStorage.getItem('token')) {
      return {};
    }
  
    const token = localStorage.getItem('token');
    console.log("Token w getUserRole", token);
    const decodedToken = jwtDecode(token);
    console.log("DecodedToken w getUserRole", decodedToken);
  
    return {
      role: decodedToken.rola ?? '',
    };
  };