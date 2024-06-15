import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient.js';
import { PlanConfig } from '@types/PlanConfig';
import { SupabaseError } from '@/types/SupabaseError'
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import DeleteButton from '@/components/common/Button';
import EditButton from '@/components/common/Button';

function detail() {
  const { id } = useParams();
  const [plan, setPlan] = useState<PlanConfig>('');
  const [isEditing, updateEditingStatus] = useState(false);
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value, name } } = event;
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
    } catch (error: SupabaseError) {
      console.log('An error occurred while deleting plan:', error.message);
    }
  }

  const onEditButtonClick = async () => {
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
    } catch (error: SupabaseError) {
      console.log('An error occurred while deleting plan:', error.message);
    } finally {
      updateEditingStatus(false);
    }
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
      } catch (error:SupabaseError) {
        console.error('Error fetching a plan:', error.message);
      }
    };

    fetchPlans();
  }, []);
  return (
    <>
      <Header>{isEditing ? 'Edit this Reading Plan' : 'About A Reading Plan'}</Header>
      <Container label="Book name" editable updateEditingStatus={updateEditingStatus} isEditing={isEditing}>
        {isEditing ? <input type="text" name="book_name" value={plan.book_name} onChange={handleChange} /> : <span>{plan.book_name}</span>}
      </Container>
      <Container label="Author" editable updateEditingStatus={updateEditingStatus} isEditing={isEditing}>
        {isEditing ? <input type="text" name="author" value={plan.author} onChange={handleChange} /> : <span>{plan.author}</span>}
      </Container>
      <Container label="Description" editable updateEditingStatus={updateEditingStatus} isEditing={isEditing}>
        {isEditing ? <input type="text" name="description" value={plan.description} onChange={handleChange} /> : <span>{plan.description}</span>}
      </Container>
      <Container label="Start Date" editable updateEditingStatus={updateEditingStatus} isEditing={isEditing}>
        {isEditing ? <input type="date" name="start_date" value={plan.start_date} onChange={handleChange} /> : <span>{plan.start_date}</span>}
      </Container>
      <Container label="End Date" editable updateEditingStatus={updateEditingStatus} isEditing={isEditing}>
        {isEditing ? <input type="date" name="end_date" value={plan.end_date} onChange={handleChange} /> : <span>{plan.end_date}</span>}
      </Container>
      {
        isEditing ? (
          <EditButton onButtonClick={onEditButtonClick}>Edit</EditButton>
        ) : (
          <DeleteButton onButtonClick={onDeleteButtonClick}>Delete</DeleteButton>
        )
      }
    </>
  );
}

export default detail;
