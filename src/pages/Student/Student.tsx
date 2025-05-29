import React, { useState } from 'react';


const Student: React.FC = () => {
  const [courses, setCourses] = useState<string[]>([]);
  const [newCourse, setNewCourse] = useState<string>('');

  const name = 'John Doe';
  const age = 20;
  const grade = 'A';

  const handleAddCourse = () => {
    if (newCourse.trim() !== '') {
      setCourses([...courses, newCourse.trim()]);
      setNewCourse('');
    }
  };

  return (
    <div className="student">
      <h2>Student Information</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Grade:</strong> {grade}</p>

      <div className="courses">
        <h3>Enrolled Courses</h3>
        {courses.length > 0 ? (
          <ul>
            {courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        ) : (
          <p>No courses enrolled yet.</p>
        )}
      </div>

      <div className="add-course">
        <input
          type="text"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          placeholder="Enter course name"
        />
        <button onClick={handleAddCourse}>Add Course</button>
      </div>
    </div>
  );
};

export default Student;