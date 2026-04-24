import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import Login from './Login';

function App() {
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);

  const fetchStudents = async (page = 1) => {
    try {
      const response = await axios.get(`http://localhost:5000/students?page=${page}&limit=5`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.log(error);
    }
  };

  const ProtectedRoute = ({ children }) => (authToken ? children : <Navigate to="/login" replace />);

  useEffect(() => {
    if (authToken) {
      fetchStudents(currentPage);
    }
  }, [authToken, currentPage]);

  return (
    <Router>
      <div>
        <h1>Student Management System</h1>
        <Routes>
          <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />

          <Route
            path="/students"
            element={(
              <ProtectedRoute>
                <div>
                  <AddStudent />
                  <h2>Student List</h2>
                  <ul>
                    {students.map((student) => (
                      <li key={student.id || student._id}>
                        {student.name} - {student.age} - {student.course}
                      </li>
                    ))}
                  </ul>
                </div>
              </ProtectedRoute>
            )}
          />

          <Route
            path="/edit/:id"
            element={(
              <ProtectedRoute>
                <EditStudent />
              </ProtectedRoute>
            )}
          />

          <Route path="/" element={<Navigate to={authToken ? '/students' : '/login'} replace />} />
          <Route path="*" element={<Navigate to={authToken ? '/students' : '/login'} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
