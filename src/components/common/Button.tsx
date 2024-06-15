import React from 'react';

interface ButtonProps {
  onButtonClick: (path: string) => void;
  children: React.ReactNode;
  path: string
}

function Button(props: ButtonProps) {
  const { children, onButtonClick, path } = props;
  return (
    <button
      className="bg-yw-100 py-2 w-2/3 rounded-lg text-xl text-white fixed bottom-10 left-1/2 transform -translate-x-1/2 shadow-xl"
      onClick={() => onButtonClick(path)}
    >
      {children}
    </button>
  )
}

export default Button;
