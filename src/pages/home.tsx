import HomeHeader from '@/components/common/Header';
import PlanList from '@/components/home/PlanList';
import AddButton from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

function home() {
  const navigate = useNavigate()
  const onAddButtonClick = (path: string) => {
    navigate(path);
  }
  return (
    <>
      <HomeHeader>Today's Reading</HomeHeader>
      <PlanList />
      <AddButton onButtonClick={onAddButtonClick} path="/add">Add New Plan</AddButton>
    </>
  )
}

export default home;
