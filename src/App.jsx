import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AddNote from './pages/AddNote';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addNotes" element={<AddNote />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile />
            }
          />

          <Route path="/" element={<h1 className="text-center mt-6">Welcome to the Notes App!</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
