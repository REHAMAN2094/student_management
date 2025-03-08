import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditStudent({ match, history }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/students/${match.params.id}`);
        setName(response.data.name);
        setAge(response.data.age);
        setCourse(response.data.course);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudent();
  }, [match.params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/students/${match.params.id}`, { name, age, course });
      history.push('/');
    } catch (error) {
      console.error('There was an error updating the student!', error);
    }
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Course:</label>
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
}

export default EditStudent;
