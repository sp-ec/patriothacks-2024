import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EventManagerDashboard from './pages/EventManagerDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
                <Route path="/employee-dashboard" element={<EmployeeDashboard />} /> 
                <Route path="/event-manager-dashboard" element={<EventManagerDashboard />} /> 
            </Routes>
        </Router>
    );
}

export default App;









// import './App.css';
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AdminDashboard from './pages/AdminDashboard';
// import EmployeeDashboard from './pages/EmployeeDashboard';
// import Landing from './pages/Landing';  // <-- Add this import



// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Landing />} />  {/* Set the Landing page as the default route */}
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;
























// const ProtectedRoute = ({ roleRequired, children }) => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');

//     if (!token || role !== roleRequired) {
//         return <Navigate to="/login" />;  // Redirect to login if not authenticated
//     }

//     return children;
// };

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 {/* Default route: redirect to login */}
//                 <Route path="/" element={<Navigate to="/login" />} />

//                 {/* Public routes */}
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />

//                 {/* Protected admin dashboard */}
//                 <Route
//                     path="/admin-dashboard"
//                     element={
//                         <ProtectedRoute roleRequired="admin">
//                             <AdminDashboard />
//                         </ProtectedRoute>
//                     }
//                 />

//                 {/* Protected employee dashboard */}
//                 <Route
//                     path="/employee-dashboard"
//                     element={
//                         <ProtectedRoute roleRequired="employee">
//                             <EmployeeDashboard />
//                         </ProtectedRoute>
//                     }
//                 />
//             </Routes>
//         </Router>
//     );
// }

// export default App;
