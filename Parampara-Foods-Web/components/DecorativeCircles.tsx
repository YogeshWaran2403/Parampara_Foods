import React from 'react';

interface DecorativeCirclesProps {
  count?: number;
  className?: string;
}

const DecorativeCircles: React.FC<DecorativeCirclesProps> = ({ 
  count = 25, 
  className = "" 
}) => {
  const circles = Array.from({ length: count }, (_, index) => {
    const circleClass = `decorative-circle-${(index % 30) + 1}`;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    
    return (
      <div
        key={index}
        className={`decorative-circle ${circleClass} ${className}`}
        style={{
          top: `${top}%`,
          left: `${left}%`,
        }}
      />
    );
  });

  return <>{circles}</>;
};

export default DecorativeCircles;
