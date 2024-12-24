import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    questionText: '',
    options: ['', '', '', ''], // Example with 4 options
    correctAnswer: '',
    difficultyLevel: 'Easy',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
    const fetchQuestion = async () => {

      setIsLoading(true);
      try { 
        const response = await api.put(`/que/update/${id}`);
        setQuestion(response.data.question);
        toast.success(response.data.message);
      } catch (error) {
        setError(error);
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'options') {
      const updatedOptions = [...question.options];
      updatedOptions[e.target.dataset.index] = value;
      setQuestion({ ...question, options: updatedOptions });
    } else {
      setQuestion({ ...question, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await api.put(`/que/update/${id}`, question);
      setQuestion(response.data.question);
      toast.success(response.data.message);
      navigate('/adminpanel'); // Redirect to admin dashboard after successful update
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-16 lg:px-24 ">
      <h1 className="text-2xl font-bold mb-4 text-center">Update Question</h1>


      {isLoading && <p>Loading question...</p>}
      {error && <p className="text-red-500">{error.message}</p>}

      <form onSubmit={handleSubmit} className='space-y-4 border border-gray-300 rounded-lg p-6 mx-auto max-w-4xl'>
        <div className="mb-6">
          <label htmlFor="questionText" className="block mb-2 font-semibold text-lg">
            Question Text:
          </label>
          <textarea 
            id="questionText"
            name="questionText"
            rows="3"
            cols="50"
            value={question.questionText}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="">
          <label className="block mb-2 font-semibold text-lg">Options:</label>
          {question.options.map((option, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name="options"
                data-index={index}
                value={option}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          ))}
        </div>

        <div className="">
          <label htmlFor="correctAnswer" className="block mb-2 font-semibold text-lg">
            Correct Answer:
          </label>
          <select
            id="correctAnswer"
            name="correctAnswer"
            value={question.correctAnswer}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            {question.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <label htmlFor="difficultyLevel" className="block mb-2 font-semibold text-lg">
            Difficulty Level:
          </label>
          <select
            id="difficultyLevel"
            name="difficultyLevel"
            value={question.difficultyLevel}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update Question
        </button>
      </form>
    </div>
  );
};

export default EditQuestion;