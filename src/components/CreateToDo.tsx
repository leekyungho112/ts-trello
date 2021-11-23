import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldtoDo) => [
      { id: Date.now(), text: toDo, category: 'TO_DO' },
      ...oldtoDo,
    ]);
    setValue('toDo', '');
  };
  return (
    <form
      style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register('toDo', {
          required: 'Write To Do',
          pattern: {
            value: /[\S]/g,
            message: '공백은 안됩니다.',
          },
        })}
        placeholder="Write To Do"
      />
      <span style={{ color: 'red' }}>{errors?.toDo?.message}</span>
      <button>ADD</button>
    </form>
  );
};

export default CreateToDo;
