import { atom, selector } from 'recoil';

export const loadedTodo = () => {
  const loadedToDo = localStorage.getItem('TODO');
  if (loadedToDo === null) {
    return;
  }

  return JSON.parse(loadedToDo);
};

export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: loadedTodo() || [],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
