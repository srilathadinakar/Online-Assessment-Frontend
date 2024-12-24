import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const Navigate = useNavigate();
  const [examTime, setExamTime] = useState(1800);

  const handleStartExam = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          Navigate("/questions", { state: { examTime: examTime.toString() } });
        })
        .catch((err) => {
          console.error("Error entering fullscreen:", err);
          // Navigate without fullscreen if it fails
          Navigate("/questions", { state: { examTime: examTime.toString() } });
        });
    } else {
      Navigate("/questions", { state: { examTime: examTime.toString() } });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-16 lg:px-24">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Welcome to your Online Exam
      </h2>

      <p className="text-lg">
        <span className="font-semibold">We're glad you're here!</span>
        <br />
        <br />
        This online exam will test your knowledge and understanding of
        Html,Javascript,React.
        <br />
        <br />
        <span className="font-semibold">Please note:</span>
      </p>
      <br />
      <ul className="list-disc pl-10">
        <li>
          Read each question carefully before selecting your answer.
          <br />
        </li>
        <li>
          Manage your time effectively to ensure you complete the exam within
          the allotted time.
          <br />
        </li>
        <li>
          Review your answers before submitting the exam.
          <br />
        </li>
        <li>
          Ensure you have a stable internet connection throughout the exam.
          <br />
        </li>
        <li>
          Refrain from using any unauthorized materials during the exam.
          <br />
        </li>
      </ul>
      <br />
      <br />
      <p className="text-lg">We wish you the best of luck!</p>
      <br />

      <p className="text-lg">
        Start your exam now ({Math.floor(examTime / 60)} minutes)
      </p>
      <br />

      <button
        id="start"
        onClick={handleStartExam}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start
      </button>
    </div>
  );
};

export default Welcome;
