import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import "../pagination.css";

import { ThreeDots } from "react-loader-spinner";

const Questions = () => {
  const { examTime } = useParams();
  const initialTime = examTime ? parseInt(examTime) : 1800;
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [currentPage, setCurrentPage] = useState(0);
  const [questionsPerPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await api.get("/que/allque");
        setQuestions(response.data.questions);
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
      {
        setLoading(false);
      }
    };
    fetchQuestions();

    //timer logic
    const timerId = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(timerId);
        setIsTimeUp(true);
        handleSubmit();
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (isTimeUp) {
      //alert("Time's up! Exam submitted automatically.");
      handleSubmit();
    }
  }, [isTimeUp]);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async () => {
    //e.preventDefault();
    //validate form
    if (Object.keys(selectedAnswers).length !== questions.length) {
      alert("Please answer all the questions");
      return;
    }
    
    try {
      const questionsAttempted = Object.entries(selectedAnswers).map(
        ([questionId, userAnswer]) => ({
          questionId,
          questionText: questions.find((q) => q._id === questionId)
            .questionText,
          userAnswer,
          correctAnswer: questions.find((q) => q._id === questionId)
            .correctAnswer,
        })
      );

      const score = questionsAttempted.reduce(
        (acc, attempt) =>
          acc + (attempt.userAnswer === attempt.correctAnswer ? 1 : 0),
        0
      );

      const totalQuestions = questionsAttempted.length;

      const percentageScore = Math.round((score / totalQuestions) * 100); // Calculate percentage score

      console.log("Percentage Score:", percentageScore);

      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("name");

      await api.post("/result/results", {
        userId,
        userName,
        questionsAttempted,
        score,
        percentageScore,
      });

      Navigate("/results");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  // Pagination logic
  const pageCount = Math.ceil(questions.length / questionsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(offset, offset + questionsPerPage);


  return (
    <div id="exam" className="container mx-auto py-12 px-4 md:px-16 lg:px-24">
      <h2 className="text-2xl font-bold mb-6 text-center">Exam</h2>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <>
          <p className="text-right text-red-500 font-bold container mx-auto m-4 max-w-4xl">
            Remaining Time :
            <span className="ml-2">
              {Math.floor(remainingTime / 60)}:
              {String(remainingTime % 60).padStart(2, "0")} minutes
            </span>
          </p>

          {currentQuestions.map((question, index) => (
            <div
              key={question._id}
              className="container mx-auto mb-2 bg-white p-4 shadow rounded relative border max-w-4xl"
            >
              <h3 className="text-lg font-semibold mb-4">
                {`${offset + index + 1}. ${question.questionText}`} 
              </h3>
              <ul className="text-gray-600 mt-2">
                {question.options.map((option, index) => (
                  <li key={index} className="border rounded p-2 mb-2">
                    <input
                      type="radio"
                      value={option}
                      id={`option_${index}`}
                      name={`question_${question._id}`}
                      checked={selectedAnswers[question._id] === option} 
                      onChange={(e) =>
                        handleAnswerChange(question._id, e.target.value)
                      }
                    />
                    <label htmlFor={`option_${index}`} className="ml-2">
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <ReactPaginate
            previousLabel={"Prev "}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </>
      )}

      <p className="text-center p-4">
        <button
          onClick={handleSubmit}
          className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        >
          Submit
        </button>
      </p>

    </div>
  );
};

export default Questions;
