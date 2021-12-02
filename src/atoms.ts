import { atom } from 'recoil';
import { loadedTodos } from './store/localStorage';

export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: loadedTodos()
    ? loadedTodos()
    : {
        'To Do': [],
        Doing: [],
        Done: [],
      },
});
