import SubmitButton from '@/components/common/Button';
import InputContainer from '@/components/common/Container';
import Header from '@/components/common/Header';
import { useState } from 'react';
import { supabase } from '@/supabaseClient.ts';
import { useNavigate } from 'react-router-dom';

function form() {
  const navigate = useNavigate();

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

  const onSubmitButtonClick = async () => {
    try {
      const { error } = await supabase.from('plans').insert([formData]);
      if (error) {
        throw error;
      }
      setFormData(initialFormData);
      navigate('/home');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Header>Add New Reading Plan</Header>
      <InputContainer label="Book name">
        <input className='border-2 border-gray-300 focus:border-yw-100 focus:outline-none' type="text" name="book_name" placeholder='bookName' onChange={handleChange} value={formData.book_name} />
      </InputContainer>
      <InputContainer label="Author">
        <input className='border-2 border-gray-300 focus:border-yw-100 focus:outline-none' type="text" name="author" placeholder='authorName' onChange={handleChange} value={formData.author} />
      </InputContainer>
      <InputContainer label="Description">
        <input className='border-2 border-gray-300 focus:border-yw-100 focus:outline-none' type="text" name="description" placeholder='description' onChange={handleChange} value={formData.description} />
      </InputContainer>
      <InputContainer label="Start Date">
        <input type="date" name="start_date" onChange={handleChange} value={formData.start_date} />
      </InputContainer>
      <InputContainer label="End Date">
        <input type="date" name="end_date" onChange={handleChange} value={formData.end_date} />
      </InputContainer>
      <SubmitButton path="" onButtonClick={onSubmitButtonClick}>Submit</SubmitButton>
    </div>
  )
}

export default form;