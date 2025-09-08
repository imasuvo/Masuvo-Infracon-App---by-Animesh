import React, { useState } from 'react';

interface ReadMoreProps {
  text: string;
  maxLength: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <p className="text-gray-300 whitespace-pre-wrap">{text}</p>;
  }

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p className="text-gray-300 whitespace-pre-wrap">
        {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      </p>
      <button 
        onClick={toggleReadMore} 
        className="text-golden-yellow font-semibold mt-2 hover:underline text-sm"
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
};

export default ReadMore;
