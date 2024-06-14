import Plan from '@components/common/Plan';

function ContentList() {
  const dummyPlans = [
    {
      id: 1,
      book_name: '알고리즘에 갇힌 자기 계발',
      author: '마크 코켈버그',
      description: '경쟁과 강박에서 벗어나 기술과 공존하는 새로운 서사 만들기',
      start_date: new Date(2024, 5, 15),
      end_date: new Date(2024, 5, 20)
    }
  ]
  return <div>
    {
      dummyPlans.map((plan, index) => {
        return <Plan key={index} data={plan} />
      })
    }
  </div>
}

export default ContentList;
