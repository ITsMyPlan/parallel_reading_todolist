import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient.ts';
import { PlanConfig } from '@/types/PlanConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import DeleteButton from '@/components/common/Button';
import EditButton from '@/components/common/Button';

function detail() {
  const { id } = useParams();
  const [plan, setPlan] = useState<PlanConfig | null>(null);
  const [isEditing, updateEditingStatus] = useState(false);
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value, name } } = event;
    if (!plan) {
      return;
    }
    setPlan({
      ...plan,
      [name]: value
    });
  };

  const navigate = useNavigate();
  const onDeleteButtonClick = async () => {
    try {
      const { error } = await supabase
        .from('plans')
        .delete()
        .eq('id', id);
    
      if (error) {
        throw error;
      } else {
        navigate('/home');
      }
    } catch (error: any) {
      console.log('An error occurred while deleting plan:', error.message);
    }
  }

  const onEditButtonClick = () => {
    if (isEditing) return;
    updateEditingStatus(true);
  }

  const onSubmitButtonClick = async () => {
    if (!isEditing) return;

    try {
      const { error } = await supabase
        .from('plans')
        .update(plan)
        .eq('id', id);
    
      if (error) {
        throw error;
      } else {
        navigate(`/about/${id}`);
      }
    } catch (error: any) {
      console.log('An error occurred while deleting plan:', error.message);
    } finally {
      updateEditingStatus(false);
    }
  }

  const onPrevButtonClick = () => {
    navigate('/home');
  }

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data, error } = await supabase
          .from('plans')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          throw error;
        } else {
          setPlan(data);
        }
      } catch (error: any) {
        console.error('Error fetching a plan:', error.message);
      }
    };

    fetchPlans();
  }, []);
  return (
    <>
      <div className="absolute top-5 left-5" onClick={onPrevButtonClick}>
        <button className="bg-yw-100/50 w-10 h-10 ml-0 rounded-full flex justify-center items-center">
          <FontAwesomeIcon className="text-gr-70" icon={faAnglesLeft} />
        </button>
      </div>
      <Header>{isEditing ? 'Editing...' : 'About A Reading Plan'}</Header>
      <div className="absolute top-5 right-5" onClick={onEditButtonClick}>
        <button className="bg-yw-100/50 w-10 h-10 ml-0 rounded-full flex justify-center items-center">
          <FontAwesomeIcon className="text-gr-70" icon={faPen} />
        </button>
      </div>
      <Container label="Book name">
        {isEditing ? <input className="w-full rounded-md py-1.5 pl-1 pr-20 ring-1 ring-inset ring-gray-300 border-2 border-gray-300 focus:border-yw-100 focus:outline-none" type="text" name="book_name" value={plan?.book_name} onChange={handleChange} /> : <span>{plan?.book_name}</span>}
      </Container>
      <Container label="Author">
        {isEditing ? <input className="w-full rounded-md py-1.5 pl-1 pr-20 ring-1 ring-inset ring-gray-300 border-2 border-gray-300 focus:border-yw-100 focus:outline-none" type="text" name="author" value={plan?.author} onChange={handleChange} /> : <span>{plan?.author}</span>}
      </Container>
      <Container label="Description">
        {isEditing ? <input className="w-full rounded-md py-1.5 pl-1 pr-20 ring-1 ring-inset ring-gray-300 border-2 border-gray-300 focus:border-yw-100 focus:outline-none" type="text" name="description" value={plan?.description} onChange={handleChange} /> : <span>{plan?.description}</span>}
      </Container>
      <Container label="Start Date">
        {isEditing ? <input className="w-full" type="date" name="start_date" value={plan?.start_date.toString()} onChange={handleChange} /> : <span>{plan?.start_date.toString()}</span>}
      </Container>
      <Container label="End Date">
        {isEditing ? <input className="w-full" type="date" name="end_date" value={plan?.end_date.toString()} onChange={handleChange} /> : <span>{plan?.end_date.toString()}</span>}
      </Container>
      {
        isEditing ? (
          <EditButton path="" onButtonClick={onSubmitButtonClick}>Submit</EditButton>
        ) : (
          <DeleteButton path="" onButtonClick={onDeleteButtonClick}>Delete</DeleteButton>
        )
      }
    </>
  );
}

export default detail;
