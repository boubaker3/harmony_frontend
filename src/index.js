 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import configStore from './components/redux/configStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
const theme = createTheme({
    palette: {
      primary: {
        main: "#EDBB00"
      },
      secondary: {
        main: "#D4002E"
      }
    }, 
  
  });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

  <React.StrictMode>
    <ThemeProvider  theme={theme}>
<Provider store={configStore}>
<App />
</Provider>
      </ThemeProvider>
  </React.StrictMode>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 