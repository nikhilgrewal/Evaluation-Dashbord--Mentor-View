import React, { useState, useEffect } from 'react';
import '../css/allStudents.css'; // Import your CSS file

function AllStudents() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState([]);
  const [mentorName, setMentorName] = useState('');
  const [isAddingMentor, setIsAddingMentor] = useState(false);

  useEffect(() => {
    // Fetch data from your backend API when the component mounts
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/student'); // Replace with your backend API route
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleChecklistClick = (student) => {
    if (!student.mentorName && !isAddingMentor) {
      const isSelected = selected.includes(student._id);
      console.log(selected.length)
      if (isSelected) {
        setSelected(selected.filter((id) => id !== student._id));
      } else {
        if (selected.length < 4) {
          setSelected([...selected, student._id]);
        }
      }
    }
    // Enable the "Add Mentor" button when a student is selected
    // setIsAddingMentor(selected.length > 0);
  };

  const handleAddMentor = () => {
    if (selected.length >= 3) {
      // Prompt the user for a mentor name using prompt or any other UI element
      const mentor = prompt('Enter Mentor Name:');

      if (mentor) {
        setMentorName(mentor);
        setIsAddingMentor(true);
      }
    }
  };

  return (
    <div>
      <h2>All Students</h2>
      {isAddingMentor && mentorName!='' ? (
        <p>Mentor Name: {mentorName}</p>
      ) : (
        selected.length > 0 && (
          <button onClick={handleAddMentor}>Add Mentor</button>
        )
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mentor Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.mentorName || (selected.includes(student._id) ? mentorName : '')}</td>
              <td>
                <button
                  disabled={student.mentorName==''}
                  onClick={() => handleChecklistClick(student)}
                >
                  {selected.includes(student._id) ? 'Selected' : 'Select'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllStudents;
