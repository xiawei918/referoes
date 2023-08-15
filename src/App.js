import './App.css';
import { useAuthContext } from './hooks/useAuthContext';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import ForgotPassword from './pages/login/ForgotPassword';
import Profile from './pages/profile/Profile';
import GetReferral from './pages/GetReferral/GetReferral';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/getreferral"
              element={
                <>
                  <GetReferral/>
                </>} />
            <Route
              path="/profiles/:uid"
              element={
                <>
                  {!user && <Navigate to="/login"/>}
                  {user && <Profile/>}
                </>} />
            <Route
              path="/"
              element={
                <>
                  {!user && <Navigate to="/login"/>}
                  {user && <Home/>}
                </>} />
            <Route
              path="/login"
              element={
                <>
                  {user && <Navigate to="/"/>}
                  {!user && <Login/>}
                </>} />
            <Route
              path="/signup"
              element={
                <>
                  {user && <Navigate to="/"/>}
                  {!user && <Signup/>}
                </>
              } />
            <Route
              path="/forgotpassword"
              element={
                <>
                  {user && <Navigate to="/" />}
                  {!user && <ForgotPassword />}
                </>
              } />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
