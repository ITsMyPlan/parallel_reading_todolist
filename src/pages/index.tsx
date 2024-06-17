import StartButton from '@/components/common/Button';
import logoImage from '@/assets/pr_logo.png';
import { useNavigate } from "react-router-dom";

function index() {
  const navigate = useNavigate();
  const onStartButtonClick = () => {
    navigate('/home');
  }

  return (
    <div>
      <img className="mt-40 mb-10" src={logoImage}></img>
      <div className='flex flex-col items-center justify-center mb-10'>
        <div className="text-4xl text-gray-900">Parallel Reading</div>
        <div className='text-4xl text-gray-900'>Todo list</div>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='text-xl text-gray-700'>매일매일 조금씩 여러 권 읽기</div>
      </div>
      <StartButton path="" onButtonClick={onStartButtonClick}>Start Now!</StartButton>
    </div>
  )
}

export default index;
