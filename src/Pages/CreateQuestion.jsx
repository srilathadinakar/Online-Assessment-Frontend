import React, { useState } from 'react';
import api from '../Services/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const CreateQuestion = () => {
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '','','']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('easy');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name,value}=e.target;
        if(name==="questionText"){
            setQuestionText(value);
        }
        else if (name === 'options') {
            const index = parseInt(e.target.id.split('_')[1]);
            const newOptions = [...options];
            newOptions[index] = value;
            setOptions(newOptions);
        }
        else if(name==="correctAnswer"){
            setCorrectAnswer(value);
        }
        else if(name==="difficultyLevel"){
            setDifficultyLevel(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/que/create', {
                questionText,
                options,    
                correctAnswer,
                difficultyLevel,
            });
            alert('Question created successfully!');
            toast.success('Question created successfully!');
            
            resetForm();
            navigate('/adminpanel');
        } catch (error) {          
            console.error('Error creating question', error);
            toast.error('Error creating question', error);  

        }
    };    
    const resetForm = () => {
        setQuestionText('');
        setOptions(['', '']);
        setCorrectAnswer('');
        setDifficultyLevel('easy');   
      };

    return (
        <div className='container mx-auto py-12 px-4 md:px-16 lg:px-24'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Create Question</h2>
            <form onSubmit={handleSubmit} className='space-y-4 border border-gray-300 rounded-lg p-6 mx-auto max-w-4xl'>
                <div className='grid gap-4'>
                    <label htmlFor="questionText" className='font-semibold'>Question Text : </label>
                    <textarea 
                        id="questionText"
                        rows="3"                        
                        name="questionText"
                        value={questionText}
                        onChange={handleChange}
                        required
                        className='border border-gray-300 rounded-md p-2 '
                    />
                </div>
                <div className='grid gap-4'>
                    <p><label htmlFor="options" className='font-semibold'>Options : </label></p>
                    <div className=''>
                    {options.map((option, index) => (
                        <p key={index} className='mb-2 '>
                            <input
                                type="text"
                                id={`option_${index}`}
                                name="options"
                                value={option}
                                onChange={handleChange}
                                required
                                className='border border-gray-300 rounded-md p-2 mb-2 w-full'
                            />
                        </p>
                    ))}
                    </div>
                </div>
                <div className='grid gap-4'>
                    <label htmlFor="correctAnswer" className='font-semibold'>Correct Answer : </label>
                    <input
                        type="text"
                        id="correctAnswer"
                        name="correctAnswer"
                        value={correctAnswer}
                        onChange={handleChange}
                        required
                        className='border border-gray-300 rounded-md p-2 w-full'
                    />
                </div>
                <div>
                    <label htmlFor="difficultyLevel" className='font-semibold'>Difficulty Level : </label>
                    <select
                        id="difficultyLevel"
                        name="difficultyLevel"
                        value={difficultyLevel}
                        onChange={handleChange}   
                        className='border border-gray-300 rounded-md p-2 mb-2'                     
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'>Create Question</button>
            </form>
        </div>
    );
};

export default CreateQuestion;