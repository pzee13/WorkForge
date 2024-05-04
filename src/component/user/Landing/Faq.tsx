import { useState } from 'react';
import { TwoText } from '../../../types/Landing/Landing';
import './Faq.css'

function Faq({ question, answer }: TwoText) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAnswer = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="faq mt-20">
      <div className="question" onClick={toggleAnswer}>
        <span className="question-text">{question}</span>
        <span className="toggle-sign">{isExpanded ? '-' : '+'}</span>
      </div>
      {isExpanded && <div className="answer">{answer}</div>}
    </div>
  );
}

export default Faq;
