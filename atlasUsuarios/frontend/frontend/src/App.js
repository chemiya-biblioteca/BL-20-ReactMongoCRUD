import AllUsers from './Component/AllUsers';
import AddUser from './Component/AddUser';
import EditUser from './Component/EditUser';
import NavBar from './Component/NavBar';
import NotFound from './Component/NotFound'; 
import CodeForInterview from './Component/CodeForInterview';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//npm install @mui/material
//npm i react-router-dom

function App() {//creo las rutas  al componente al que dirigen
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<CodeForInterview /> } />
        <Route path="all" element={<AllUsers /> } />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
