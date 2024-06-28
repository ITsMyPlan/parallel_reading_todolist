import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { TaskConfig } from '@/types/TaskConfig';
import { supabase } from '@/supabaseClient.ts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import Container from '@/components/common/Container';
import SubmitButton from '@/components/common/Button';
import Header from '@/components/common/Header';

function addTask() {
  const [tasks, setTasks] = useState<TaskConfig[]>([]);
  const [isWriting, updateWritingStatus] = useState(false);
  const { plan_id } = useParams();
  const initialFormData = {
    goal: '',
    created_at: '',
    plan_id: plan_id
  }
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('plan_id', plan_id)
          
        if (error) {
          throw error;
        } else {
          setTasks(data);
        }
      } catch (error: any) {
        console.error('Error fetching a plan:', error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value, name } } = event;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const navigate = useNavigate();
  const onSubmitButtonClick = async () => {
    if (isWriting) return;

    updateWritingStatus(true);

    try {
      const { error } = await supabase
        .from('tasks')
        .insert([formData])
      
        if (error) {
          throw error;
        } else {
          navigate('/home');
        }
    } catch (error: any) {
      console.log('An error occurred while adding task:', error.message);
    } finally {
      updateWritingStatus(false);
    }
  }

  const onPrevButtonClick = () => {
    navigate('/home');
  }

  return (
    <>
      <div className="absolute top-5 left-5" onClick={onPrevButtonClick}>
        <button className="bg-yw-100/50 w-10 h-10 ml-0 rounded-full flex justify-center items-center">
          <FontAwesomeIcon className="text-gr-70" icon={faAnglesLeft} />
        </button>
      </div>
      <Header>Today Goals</Header>
      {tasks.map((task: TaskConfig) => {
        return (
          <div key={task.id}>
            <Container label={task.created_at.toString()}>{task.goal}</Container>
          </div>
        );
      })}
      <Container label="오늘의 목표를 작성해봐요!">
        <input className="w-full rounded-md py-1.5 pl-1 pr-20 ring-1 ring-inset ring-gray-300 border-2 border-gray-300 focus:border-yw-100 focus:outline-none" type="text" name="goal" onChange={handleChange}/>
        <input type="date" name="created_at" onChange={handleChange}/>
      </Container>
      <SubmitButton path="" onButtonClick={onSubmitButtonClick}>Submit</SubmitButton>
    </>
  );
}

export default addTask;
