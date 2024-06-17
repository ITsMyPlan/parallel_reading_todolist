import Plan from '@components/common/Plan';
import { PlanConfig } from '@/types/PlanConfig';
import { TaskConfig } from '@/types/TaskConfig';
import { supabase } from '@/supabaseClient.ts';
import { useState, useEffect } from 'react';

function PlanList() {
  const [plans, setPlans] = useState<PlanConfig[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('*, tasks(id, goal, created_at) ')
        .filter('tasks.created_at', 'eq', today);
      
      if (error) {
        console.error('Error fetching plans:', error);
      } else {
        const plans = data.map((datum: PlanConfig) => ({
          ...datum,
          start_date: new Date(datum.start_date),
          end_date: new Date(datum.end_date),
          tasks: datum.tasks.map((task: TaskConfig) => ({
            ...task,
            created_at: new Date(task.created_at),
          }))
        }))
        setPlans(plans);
      }
    };

    fetchPlans();
  }, []);
  return <div className="mx-5">
    {
      plans.map((plan, index) => {
        return <Plan key={index} data={plan} />
      })
    }
  </div>
}

export default PlanList;
