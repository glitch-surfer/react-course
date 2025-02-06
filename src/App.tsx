import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import { Details } from './components/Main/Details/Details.tsx';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="" element={<Details />} />
          </Route>
          <Route path="*" element={'NOT FOUND'} />
        </Routes>
      </Router>
    </div>
  );
};
