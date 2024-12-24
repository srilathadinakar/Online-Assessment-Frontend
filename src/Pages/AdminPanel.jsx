// AdminDashboard.js

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../Services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';

const AdminPanel = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);

    const [currentPage, setCurrentPage] = useState(0); 
    const [pageCount, setPageCount] = useState(0); 
    const itemsPerPage = 5; 

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/que/allque');
        setQuestions(response.data.questions);
        setPageCount(Math.ceil(response.data.questions.length / itemsPerPage));
      } catch (error) {
        console.error('Error fetching questions:', error);
        toast.error(error.response.data.message);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    
    if (window.confirm("Are you sure you want to delete this question?")) {
        try {
            await api.delete(`/que/delete/${id}`);
            const updatedQuestions = questions.filter((question) => question._id !== id);
            setQuestions(updatedQuestions); 
            setPageCount(Math.ceil(updatedQuestions.length / itemsPerPage));
            toast.success('Question deleted successfully!');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
  };

  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  const getVisibleQuestions = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return questions.slice(startIndex, endIndex);
  };
  const startIndex = currentPage * itemsPerPage;
  return (
    <div className="container mx-auto py-12 px-4 md:px-16 lg:px-24 ">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h1>

      <div className="mb-4 flex justify-between">
        <Link to="/createquestion" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Question
        </Link>
        <Link to={"/questions"} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4'>All Questions</Link>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Question</th>
            <th className="px-4 py-2">Options</th>
            <th className="px-4 py-2">Correct Answer</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {getVisibleQuestions().map((question,index) => (
            <tr key={question._id}>
              <td className="border px-4 py-2">
                {`${startIndex + index + 1}. ${question.questionText}`} 
                {/* {index + 1} . {question.questionText} */}
              </td>
              <td className="border px-4 py-2">
                {/* {question.options.join(', ')} */}
                <ul>
                    {question.options.map((option, index) => (
                    <li key={index} className='list-disc ml-4'> {option}</li>
                    ))}
                </ul>
              </td>
              <td className="border px-4 py-2">{question.correctAnswer}</td>
              <td className="border px-4 py-2">
                <Link to={`/editquestion/${question._id}`} className="text-blue-500 mr-2">
                  Edit
                </Link>

                <button 
                  className="text-red-500" 
                  onClick={() => handleDelete(question._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination mt-4">
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          pageLinkClassName={'pagination__link'}
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          activeClassName={'pagination__link--active'}
        />
      </div>

    </div>
  );
};

export default AdminPanel;