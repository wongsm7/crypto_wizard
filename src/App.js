import './App.css';
import Header from './components/Header'
import CryptoHome from './pages/Home'
import Crypto from './pages/Crypto'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<CryptoHome />} exact/>
          <Route path="/crypto/:id" element={<Crypto />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
