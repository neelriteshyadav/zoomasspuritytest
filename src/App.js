/** @format */

import { useState } from 'react';
import './tailwind.css';
import questions from './questions.js';
import AnimatedProgressBar from './AnimatedBar';

function App() {
	const [checkedBoxes, setCheckedBoxes] = useState({});
	const [score, setScore] = useState(100);
	const [showScore, setShowScore] = useState(false); // State to track if score has been calculated

	const handleCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setCheckedBoxes({ ...checkedBoxes, [name]: checked });
	};

	const calculateScore = () => {
		try {
			const newScore = Object.values(checkedBoxes).reduce(
				(acc, cur) => (cur ? acc + 1 : acc),
				0,
			);
			setScore(100 - newScore);
			setShowScore(true); // Set showScore to true after calculating score
		} catch (error) {
			console.error('Error calculating score:', error);
		}
	};

  const showHome = () => {
    setShowScore(false); // Set showScore to false to show checkboxes again
    setCheckedBoxes({}); // Reset the checked checkboxes state
    setScore(100); // Reset the score to 100

     // Uncheck all checkboxes on the page
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  };
  
	const shareScore = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: 'Share Your Score',
					text: `My score on the purity test is ${score}!`,
					url: window.location.href,
				});
			} catch (error) {
				console.error('Error sharing score:', error);
			}
		} else {
			// Fallback behavior for browsers that don't support the navigator.share API
			const shareUrl = `https://example.com/`;
			window.open(shareUrl, '_blank');
		}
	};

	return (
		<div className='bg-gray-100 min-h-screen flex flex-col justify-center items-center font-poppins w-full'>
			<h1 className='text-3xl font-bold mb-8 pt-10'>ZooMass Purity Test</h1>
			<div className='w-3/5 flex justify-center items-center'>
				Ready to uncover your 'ZooMass' purity? Take the ultimate college
				challenge – from hand-holding to streaking, we've got checkboxes for
				every questionable choice you've made. Find out if you're a saint or a
				party legend in just a click!
			</div>
			<div className='w-3/5 font-semibold flex justify-center pt-5'>
				Caution: This is not a bucket list. Completion of all items on this test
				will likely result in death.
			</div>
			<div className='w-3/5 flex justify-center items-center pt-5 pb-5'>
				Click on every item you have done.
			</div>
			{showScore ? ( // Conditional rendering based on showScore state
				<div className='w-3/5 flex items-start justify-center flex-col'>
					<AnimatedProgressBar score={score} />
					<div className='mt-8 flex space-x-5'>
						<button
							onClick={shareScore}
							className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110'>
							Share Score
						</button>
						<button
							onClick={showHome}
							className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110'>
							Give The Test Again
						</button>
					</div>
				</div>
			) : (
				<div className='w-3/5 flex items-start justify-center flex-col'>
					{questions.map((question, index) => (
						<label
							key={index}
							className='flex items-center'>
							<input
								type='checkbox'
								name={`checkbox${index + 1}`}
								onChange={handleCheckboxChange}
								className='mr-2'
							/>
							<span>{question}</span>
						</label>
					))}
          <div className='flex space-x-5 pb-10'>
            <button
              className='mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110'
              onClick={calculateScore}>
              Calculate My Score
            </button>
            <button
              className='mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110'
              onClick={showHome}>
              Clear all checkboxes
            </button>
          </div>
				</div>
			)}
		</div>
	);
}

export default App;
