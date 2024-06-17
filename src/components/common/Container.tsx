import React from 'react';

interface ContainerProps {
  label: string,
  children: React.ReactNode
}

function Container(props: ContainerProps) {
  const { children, label } = props;

  return (
    <div
      className="border-8 border-solid border-yw-50/50 rounded-lg p-3 flex flex-col m-5"
    >
      <span className="text-gr-70 font-semibold text-lg">{label}</span>
      <span>{children}</span>
    </div>
  )
}

export default Container;
