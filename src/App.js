import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Home /> } />
      <Route exact path="/search" element={ <SearchPage /> } />
      <Route exact path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
