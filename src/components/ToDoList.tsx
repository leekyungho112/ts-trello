import { useForm } from 'react-hook-form';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

const toDoState = atom({
  key: 'toDo',
  default: [],
});

interface IForm {
  toDo: string;
}

const ToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  const [value, modFn] = useRecoilState(toDoState);

  const onSubmit = (data: IForm) => {
    setValue('toDo', '');
  };
  return (
    <div>
      <h2>Task</h2>
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
      <ul></ul>
    </div>
  );
};

export default ToDoList;
