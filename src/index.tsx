import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDL2f9FZA7OqT9CXEjkNDHwBgW94-wd-w",
  authDomain: "home-loan-amortization.firebaseapp.com",
  projectId: "home-loan-amortization",
  storageBucket: "home-loan-amortization.firebasestorage.app",
  messagingSenderId: "995499845690",
  appId: "1:995499845690:web:d3079b8f6bf3e38eeb6d03",
  measurementId: "G-57LMBG84QP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
