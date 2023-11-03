import { SocketIoConfig } from "ngx-socket-io";

export const firebaseConfig = {
  apiKey: "AIzaSyCE-n1QzXBCKPyRPKtDPJHj--ByR3hraIU",
  authDomain: "thesis-management-cdf24.firebaseapp.com",
  projectId: "thesis-management-cdf24",
  storageBucket: "thesis-management-cdf24.appspot.com",
  messagingSenderId: "45928768394",
  appId: "1:45928768394:web:06efa90a609c0193ffde73",
  measurementId: "G-QNCWRH288N"
};

export const environment = {
  production: false,
  currentSchoolYear: '2023-2024',
  currentSemester: '1'
};

const user = JSON.parse(localStorage.getItem('user') || '{}');
console.log(user);
const userId = user._id;
export const socketIOConfig: SocketIoConfig = { url: 'http://localhost:8000', options: {
  query: {
    userId: userId
  }
}, };


