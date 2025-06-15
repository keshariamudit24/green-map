import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminHome from './pages/AdminHome';
import SignIn from './pages/SignIn';
import AddEvents from './pages/AddEvents'; // Import AddEvents instead of Dashboard

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/signin" element={<SignIn />} />
          <Route path="/admin/events/add" element={<AddEvents />} /> {/* Changed route */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
