import React from 'react'
import './App.css';
import Header from './components/Header'
import CryptoHome from './pages/Home'
import Crypto from './pages/Crypto'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const themeLight = createTheme({
  palette: {
    mode: 'light'
  },
});

const themeDark = createTheme({
  palette: {
    mode: 'dark'
  },
});



function App() {
  const [theme, setTheme] = React.useState(true);
  const toggleTheme = () => {
    setTheme(prev => !prev)
  }
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme ? themeLight : themeDark}>
        <CssBaseline />
        <Header toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<CryptoHome />} exact />
          <Route path="/crypto/:id" element={<Crypto />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
