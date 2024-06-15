import React from 'react';

interface ContainerProps {
  label: string,
  children: React.ReactNode,
  editable: boolean,
  updateEditingStatus: (isEditing: boolean) => void,
  isEditing: boolean
}

function Container(props: ContainerProps) {
  const { children, label, editable, updateEditingStatus, isEditing } = props;

  const onClickEditButton = () => {
    if (isEditing) return;
    updateEditingStatus(true);
  }

  return (
    <div
      className="border-8 border-solid border-yw-50/50 rounded-lg p-3 flex flex-col m-5"
    >
      {editable ? <button onClick={onClickEditButton} className="bg-yw-100">edit</button> : null}
      <span>{label}</span>
      <span>{children}</span>
    </div>
  )
}

export default Container;
