import React, { useState, useEffect } from 'react';
import api from '../Services/api';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThreeDots } from "react-loader-spinner";
import { Link } from 'react-router-dom';

const ViewResults = () => {

    const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('userId'); 
        
        const response = await api.get(`/result/results/${userId}`);
        //const data = await response.json();
        setResult(response.data.result);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchResult();
  }, []);

    return (
        <div className='container mx-auto py-12 px-4 md:px-16 lg:px-24'>
              <h2 className="text-2xl font-bold mb-6 text-left">Your Answers</h2>
        
              {loading ? (
                <div className="flex justify-center items-center h-screen">
                  <ThreeDots color="#00BFFF" height={80} width={80} />
                </div>
              ) : (
                
                result && (
                <div className="container mx-auto mb-2 bg-white p-4 shadow rounded relative border max-w-4xl">
                  
                  {result.questionsAttempted.map((attempt,index) => (
                    <div key={attempt.questionId} className='mb-8'>
                      
                      <p className='font-semibold'>{index + 1} . Question Text: <span className='font-normal'>{attempt.questionText}</span></p>   
                      <p className='font-semibold'>Selected Answer:  <span className='font-normal'>{attempt.userAnswer}</span></p>
                      <p className='font-semibold'>Correct Answer: <span className='font-normal'> {attempt.correctAnswer}</span></p>
                    </div>
                  ))
                  }
                  <p className='font-semibold text-xl'>Score: <span className='font-normal'>{result.score}</span></p> 
                  <p className='font-semibold text-xl'>Percentage : <span className='font-normal'>{result.percentageScore}</span></p>   
        
                  
                </div>
              )
              )
            }
            </div>
    );
};

export default ViewResults;