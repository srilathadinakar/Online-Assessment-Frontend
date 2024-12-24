import React, { useState } from 'react';
import api from '../Services/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateExam = () => {
    const [name, setName] = useState('');
    const [questions, setQuestions] = useState([]); // Array to store question IDs
    const [duration, setDuration] = useState(0);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/exam/create', {
                name,
                questions,
                duration,
                startTime,
                endTime,
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
      <h2>Create Exam</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="questions">Questions (IDs):</label>
          <input
            type="text"
            id="questions"
            value={questions.join(', ')} // Display comma-separated IDs
            onChange={(e) => setQuestions(e.target.value.split(',').map(Number))} // Convert string to array of numbers
          />
        </div>
        <div>
          <label htmlFor="duration">Duration (minutes):</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time (ISO 8601):</label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time (ISO 8601):</label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Exam</button>
      </form>
      
    </div>
    );
};

export default CreateExam;