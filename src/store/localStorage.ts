import { IToDoState } from '../atoms';

export const loadedTodos = () => {
  const localState = localStorage.getItem('state');
  if (localState !== null) {
    return JSON.parse(localState);
  }
};

export const saveTodos = (todo: IToDoState) => {
  localStorage.setItem('state', JSON.stringify(todo));
};
