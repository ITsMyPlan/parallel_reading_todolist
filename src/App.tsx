import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IntroPage from '@pages/index';
import HomePage from '@pages/home';
import LoginPage from '@pages/login';
import FormPage from '@pages/form';
import DetailPage from '@pages/detail';
import AddTaskPage from '@pages/addTask';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<IntroPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/add" element={<FormPage />}></Route>
        <Route path="/about/:id" element={<DetailPage />}></Route>
        <Route path="/edit/:id" element={<FormPage />}></Route>
        <Route path="/add_task/:plan_id" element={<AddTaskPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
