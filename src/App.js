import './App.css';
import { useAuthContext } from './hooks/useAuthContext';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import ForgotPassword from './pages/login/ForgotPassword';
import Profile from './pages/profile/Profile';
import ApplicationForm from './pages/getReferral/ApplicationForm';
import Application from './pages/application/Application';
import GiveReferral from './pages/giveReferral/GiveReferral';
import CompanyReferrers from './pages/company/CompanyReferrers';
import CompanyApplicants from './pages/company/CompanyApplicants';
import SearchResult from './pages/searchResult/searchResult';
import MyApplications from './pages/myApplications/MyApplications';
import MyReferrals from './pages/myReferrals/MyReferrals';
import LandingPage from './pages/landing/Landing';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/getreferral/:uid?"
              element={
                <>
                  {user && <ApplicationForm/>}
                  {!user && <Navigate to="/login"/>}
                </>}/>
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
                  <Home/>
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
              <Route 
                path="/applications/:id" 
                element={
                  <>
                  {!user && <Navigate to="/login" />}
                  {user && <Application />}
                  </>
                }/>
              <Route 
                path="/givereferral" 
                element={
                  <>
                  {!user && <Navigate to="/login" />}
                  {user && <GiveReferral />}
                </>
                }/>
              <Route 
                path="/companyreferrers/:company" 
                element={
                  <CompanyReferrers/>
                }/>
              <Route 
                path="/search" 
                element={
                  <SearchResult/>
              }/>
              <Route 
              path="/companyapplicants/:company" 
              element={
                <>
                  {!user && <Navigate to="/login" />}
                  {user && <CompanyApplicants />}
                </>
              }/>
              <Route 
              path="/myapplications" 
              element={
                <>
                  {!user && <Navigate to="/login" />}
                  {user && <MyApplications />}
                </>
              }/>
              <Route 
              path="/myreferrals" 
              element={
                <>
                  {!user && <Navigate to="/login" />}
                  {user && <MyReferrals />}
                </>
              }/>
              <Route 
              path="/landingpage" 
              element={
                <>
                  {!user && <Navigate to="/login" />}
                  {user && <LandingPage />}
                </>
              }/>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
