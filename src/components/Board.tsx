import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';
import { ITodo, toDoState } from '../atoms';
import { useRecoilState } from 'recoil';
import { saveTodos } from '../store/localStorage';

const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Title = styled.h2`
  color: ${(props) => props.theme.bgColor};
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
`;

const DeleteBoardButton = styled.button`
  border: none;
  padding: 5px 10px;
  position: absolute;
  top: 5px;
  right: 10px;
  border-radius: 5px;
  background-color: #ee5253;
  color: #576574;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: black;
    color: white;
  }
`;

interface IAreaProps {
  isDraggingFromThisWith: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#84817a'
      : props.isDraggingFromThisWith
      ? '#cc8e35'
      : '#218c74'};
  transition: all 0.2s ease-in-out;
  flex-grow: 1;
  padding: 20px;
`;
interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  boardIndex: number;
}
interface IForm {
  toDo: string;
}
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    padding: 10px 10px;
  }
`;

const Board = ({ toDos, boardId, boardIndex }: IBoardProps) => {
  const [toDoStates, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onVaild = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue('toDo', '');
  };
  const handleDeleteBoard = () => {
    setToDos((allBoards) => {
      const boards = { ...allBoards };
      delete boards[boardId];
      return { ...boards };
    });
  };

  useEffect(() => {
    saveTodos(toDoStates);
  }, [toDoStates]);
  return (
    <Draggable draggableId={boardId} index={boardIndex} key={boardId}>
      {(magic) => (
        <Wrapper
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <Title>{boardId}</Title>
          <DeleteBoardButton onClick={handleDeleteBoard}>
            DELETE
          </DeleteBoardButton>
          <Form onSubmit={handleSubmit(onVaild)}>
            <input
              {...register('toDo', { required: true })}
              type="text"
              placeholder={`Add Task ${boardId}`}
            />
          </Form>
          <Droppable droppableId={boardId}>
            {(magic, snapshot) => (
              <Area
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {toDos?.map((toDo, index) => (
                  <DragabbleCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Board;
