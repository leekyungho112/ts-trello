import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Categories, IToDo, toDoState } from '../atoms';

const ToDo = ({ text, category, id }: IToDo) => {
  const [todos, setToDos] = useRecoilState(toDoState);

  useEffect(() => {
    localStorage.setItem('TODO', JSON.stringify(todos));
  }, [todos]);
  const onClick = (newCategory: IToDo['category']) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);

      const newTodo = { id, text, category: newCategory };

      return [
        ...oldToDos.slice(0, targetIndex),
        newTodo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onDelete = () => {
    setToDos((oldTodo) => {
      return oldTodo.filter((toDo) => toDo.id !== id);
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick(Categories.TO_DO)}>TO DO</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>DONE</button>
      )}
      <button onClick={onDelete}>DELETE</button>
    </li>
  );
};

export default ToDo;
