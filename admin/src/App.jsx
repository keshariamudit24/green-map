import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminHome from './pages/AdminHome';
import SignIn from './pages/SignIn';
import Events from './pages/Events';
import AddEvents from './pages/AddEvents';
import EditEvent from './pages/EditEvent';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/signin" element={<SignIn />} />
            <Route path="/admin/events" element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            } />
            <Route path="/admin/events/add" element={
              <ProtectedRoute>
                <AddEvents />
              </ProtectedRoute>
            } />
            <Route path="/admin/events/edit/:id" element={
              <ProtectedRoute>
                <EditEvent />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
