import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { SupabaseError } from '@/types/SupabaseError';
import { TaskConfig } from '@/types/TaskConfig';
import { supabase } from '@/supabaseClient.js';
import Container from '@/components/common/Container';
import SubmitButton from '@/components/common/Button';

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
      } catch (error:SupabaseError) {
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
    } catch (error: SupabaseError) {
      console.log('An error occurred while adding task:', error.message);
    } finally {
      updateWritingStatus(false);
    }
  }

  return (
    <>
      {tasks.map((task: TaskConfig) => {
        return (
          <div key={task.id}>
            <Container label={task.created_at}>{task.goal}</Container>
          </div>
        );
      })}
      <Container label="오늘의 목표를 작성해봐요!">
        <input type="text" name="goal" onChange={handleChange}/>
        <input type="date" name="created_at" onChange={handleChange}/>
      </Container>
      <SubmitButton onButtonClick={onSubmitButtonClick}>Submit</SubmitButton>
    </>
  );
}

export default addTask;
