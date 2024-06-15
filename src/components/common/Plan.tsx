import { PlanConfig } from '@types/PlanConfig';

interface PlanProps {
  data: PlanConfig
}

function Plan(props: PlanProps) {
  const { data } = props;
  const getFormattedDate = (date: Date) :string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return (
    <div className="border border-solid border-yw-100 border-10 p-2 flex flex-col mt-5">
      <div>책 이름: {data.book_name}</div>
      <div>저자: {data.author}</div>
      <div>설명: {data.description}</div>
      <div>시작일: {getFormattedDate(data.start_date)}</div>
      <div>완료일: {getFormattedDate(data.end_date)}</div>
    </div>
  );
}

export default Plan;
