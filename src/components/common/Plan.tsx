import { PlanConfig } from '@/types/PlanConfig';
import { TaskConfig } from '@/types/TaskConfig';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faClock } from "@fortawesome/free-solid-svg-icons";
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
  const goToAddTask = () => {
    navigate(`/add_task/${data.id}`)
  }

  return (
    <div className="border-8 border-solid border-yw-50/50 rounded-lg p-2 flex flex-col mt-5">
      <div className="flex items-center justify-between">
        <div className="text-gr-70 font-semibold text-lg">{data.book_name}</div>
        <FontAwesomeIcon className="text-gr-70" icon={faAnglesRight} onClick={goToDetail} />
      </div>
      {data.tasks.length > 0 ? data.tasks.map((task: TaskConfig) => {
        return (
          <div key={task.id}>
            <div className="text-gr-70 text-base font-medium">{task.goal}</div>
          </div>
        );
      }) : <div className="text-yw-100 font-medium" onClick={goToAddTask}>오늘의 목표를 기다리고 있어요!</div>}
      <div className="flex items-center gap-2">
        <FontAwesomeIcon className="text-gr-70" icon={faClock} />
        <div className="text-gr-70 font-semibold text-base">D-{daysRemaining}</div>
      </div>
    </div>
  );
}

export default Plan;
