import { useForm } from 'react-hook-form';
const ToDoList = () => {
  //   const [todo, setTodo] = useState('');

  //   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
  //     const {
  //       currentTarget: { value },
  //     } = event;
  //     setTodo(value);
  //   };
  //   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     console.log(todo);
  //   };
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register('toDo')} placeholder="Write To Do" />
        <button>ADD</button>
      </form>
    </div>
  );
};

export default ToDoList;
