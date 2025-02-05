import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={'NOT FOUND'} />
        </Routes>
      </Router>
    </div>
  );
};
