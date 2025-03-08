import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };
  
  const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        authToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  useEffect(() => {
    if (authToken) {
      fetchStudents(currentPage);
    }
  }, [authToken, currentPage]);

  return (
    <Router>
      <div>
        <h1>Student Management System</h1>
        <Switch>
          <Route path="/login">
            <Login setAuthToken={setAuthToken} />
          </Route>

          <ProtectedRoute
            path="/students"
            component={() => (
              <div>
                <AddStudent />
                <h2>Student List</h2>
                <ul>
                  {students.map((student) => (
                    <li key={student._id}>
                      {student.name} - {student.age} - {student.course}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          />

          <ProtectedRoute path="/edit/:id" component={EditStudent} />

          <Redirect from="/" to={authToken ? '/students' : '/login'} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
