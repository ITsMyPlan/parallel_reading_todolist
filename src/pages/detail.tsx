import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient.js';
import { PlanConfig } from '@types/PlanConfig';
import { SupabaseError } from '@/types/SupabaseError'
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import DeleteButton from '@/components/common/Button';

function detail() {
  const { id } = useParams();
  const [plan, setPlan] = useState<PlanConfig>('');

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
      <Header>About A Reading Plan</Header>
      <Container label="Book name">
        {plan.book_name}
      </Container>
      <Container label="Author">
        {plan.book_name}
      </Container>
      <Container label="Description">
        {plan.description}
      </Container>
      <Container label="Start Date">
        {plan.start_date}
      </Container>
      <Container label="End Date">
        {plan.end_date}
      </Container>
      <DeleteButton onButtonClick={() => console.log('click') }>Delete</DeleteButton>
    </>
  );
}

export default detail;
