import Plan from '@components/common/Plan';
import { PlanConfig } from '@types/PlanConfig';
import { supabase } from '@/supabaseClient.js';
import { useState, useEffect } from 'react';

function PlanList() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('*');

      if (error) {
        console.error('Error fetching plans:', error);
      } else {
        const plans = data.map((datum: PlanConfig) => ({
          ...datum,
          start_date: new Date(datum.start_date),
          end_date: new Date(datum.end_date)
        }))
        setPlans(plans);
      }
    };

    fetchPlans();
  }, [plans]);
  return <div className="mx-5">
    {
      plans.map((plan, index) => {
        return <Plan key={index} data={plan} />
      })
    }
  </div>
}

export default PlanList;
