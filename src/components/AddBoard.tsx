import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atoms';
import { saveTodos } from '../store/localStorage';

const AddForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  input {
    width: 90%;
    border: none;
    padding: 10px 5px;
    border-radius: 10px;
  }
`;
const Title = styled.h1`
  color: #3c40c6;
  font-weight: bold;
  margin-bottom: 5px;
`;

interface IAddBoard {
  category: string;
}

const AddBoard = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IAddBoard>();
  const onVaild = ({ category }: IAddBoard) => {
    if (category === '') {
      return;
    }
    setToDos((allBoard) => {
      return {
        [category]: [],
        ...allBoard,
      };
    });
    setValue('category', '');
  };

  useEffect(() => {
    saveTodos(toDos);
  }, [toDos]);

  return (
    <AddForm onSubmit={handleSubmit(onVaild)}>
      <Title>Your Create Board Start!</Title>
      <input
        {...register('category', { required: true })}
        type="text"
        placeholder="Add Task Board"
      />
    </AddForm>
  );
};

export default AddBoard;
