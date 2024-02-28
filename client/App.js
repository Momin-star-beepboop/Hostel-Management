import './App.css';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import AfterLogin from './components/afterlogin';
import WardenLogin from './components/wardenlogin';
import AdminLogin from './components/adminlogin';
import ViewWardens from './components/view-wardens';
import ViewStudents from './components/view-students';
import Allotment from './components/allotment';
import ViewRoom from './components/viewroom';
import Complaints from './components/complaints';
import Feedback from './components/feedback';
import ViewComplaints from './components/viewcomplaints';
import ViewFeed from './components/viewfeed';
import Rating from './components/giverating';
import Analyze from './components/analyze';
import UpdateRoom from './components/updateroom';
import SearchResults from './components/searchresults';
import SearchFeed from './components/searchfeed';
import Auth from './components/auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/afterlogin" element={<AfterLogin />} />
        <Route path="/wardenlogin" element={<WardenLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/view-wardens" element={<ViewWardens />} />
        <Route path="/view-students" element={<ViewStudents />} />
        <Route path="/allot-rooms" element={<Allotment />} />
        <Route path="/view-room" element={<ViewRoom />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/view-complaints" element={<ViewComplaints />} />
        <Route path="/view-feedback" element={<ViewFeed />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/updateroom" element={<UpdateRoom />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/search-feed" element={<SearchFeed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
