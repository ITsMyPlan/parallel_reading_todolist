import { PlanConfig } from '@types/PlanConfig';
import { TaskConfig } from '@types/TaskConfig';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface PlanProps {
  data: PlanConfig
}

const getDaysRemaining = (end_date: Date) => {
  if (!end_date) return '';

  const today = new Date();
  const timeDiff = end_date.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return daysDiff.toString();
}

function Plan(props: PlanProps) {
  const { data } = props;
  const [daysRemaining, setDaysRemaining] = useState('');

  useEffect(() => {
    setDaysRemaining(getDaysRemaining(data.end_date));
  }, [data.end_date]);

  const navigate = useNavigate();
  const goToDetail = () => {
    navigate(`/about/${data.id}`)
  }

  return (
    <div className="border-8 border-solid border-yw-50/50 rounded-lg p-2 flex flex-col mt-5">
      <button className='bg-yw-100' onClick={goToDetail}>more</button>
      <div>책 이름: {data.book_name}</div>
      {data.tasks.length > 0 ? data.tasks.map((task: TaskConfig) => {
        return (
          <div key={task.id}>
            <div>{task.goal}</div>
          </div>
        );
      }) : <button className='bg-yw-100' onClick={ () => console.log('hi')}>오늘의 목표를 작성해봐요!</button>}
      <div>D-{daysRemaining}</div>
    </div>
  );
}

export default Plan;
