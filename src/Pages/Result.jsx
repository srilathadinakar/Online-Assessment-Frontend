import React, { useState, useEffect } from 'react';
import api from '../Services/api';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThreeDots } from "react-loader-spinner";
import { Link } from 'react-router-dom';
import ViewResults from './ViewResults';

const Result = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showResult, setShowResult] = useState(false);

  // Document object for fullscreen control
  const documentRef = React.createRef(null); 

  // Exit fullscreen on component mount
  useEffect(() => {
    const handleMount = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (document.mozFullScreenElement) {
        document.mozCancelFullScreen();
      } else if (document.webkitIsFullScreen) {
        document.webkitExitFullscreen();
      }
    };

    handleMount();

    return () => {}; 
  }, []);

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('userId'); 

        // Simulate delay before fetching result (replace with actual API call)
        await new Promise((resolve) => setTimeout(resolve, 10000)); // Adjust delay as needed
        
        const response = await api.get(`/result/results/${userId}`);
        //const data = await response.json();
        setResult(response.data.result);

        // Show result after the delay
        setShowResult(true);

      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
      setLoading(false);
    };

    fetchResult();
  }, []);

  return (
    <div className='container mx-auto py-12 px-4 md:px-16 lg:px-24'>
      <h2 className="text-2xl font-bold mb-6 text-center">Your Result</h2>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        
        showResult ? result && (
        <div className="container mx-auto mb-2 bg-white p-4 shadow rounded relative border max-w-4xl">
          <h2 className='font-semibold text-xl mb-4'>Student Name : <span className='capitalize'>{result.userName}</span></h2>

          <p className='font-semibold text-xl'>Score: <span className='font-normal'>{result.score}</span></p> 
          <p className='font-semibold text-xl'>Percentage : <span className='font-normal'>{result.percentageScore}</span></p>   

          <p className=' text-lg mt-6'>Click the link to view your answers for each question. <span className='font-semibold underline text-blue-600'><Link to={'/viewresults'}>View Results</Link></span></p>   
        </div>
      ): (
        <p className="text-center p-4">
          Simulating result processing... Please wait.
        </p>
      )
      )
    }
    </div>
  );
};

export default Result;