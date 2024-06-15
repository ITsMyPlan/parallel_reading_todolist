import SubmitButton from '@components/common/Button';
import InputContainer from '@/components/common/Container';
import { useState } from 'react';

function form() {
  const initialFormData = {
    book_name: '',
    author: '',
    description: '',
    start_date: '',
    end_date: ''
  }

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value, name } } = event;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmitButtonClick = () => {
    console.log('click!')
  };

  return (
    <div>
      <InputContainer label="Book name">
        <input type="text" name="book_name" placeholder='bookName' onChange={handleChange} value={formData.book_name} />
      </InputContainer>
      <InputContainer label="Author">
        <input type="text" name="author" placeholder='authorName' onChange={handleChange} value={formData.author} />
      </InputContainer>
      <InputContainer label="Description">
        <input type="text" name="description" placeholder='description' onChange={handleChange} value={formData.description} />
      </InputContainer>
      <InputContainer label="Start Date">
        <input type="date" name="start_date" onChange={handleChange} value={formData.start_date} />
      </InputContainer>
      <InputContainer label="End Date">
        <input type="date" name="end_date" onChange={handleChange} value={formData.end_date} />
      </InputContainer>
      <SubmitButton onClick={onSubmitButtonClick}>Submit</SubmitButton>
    </div>
  )
}

export default form;