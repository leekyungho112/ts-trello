import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDoState, toDoState } from './atoms';
import AddBoard from './components/AddBoard';
import Board from './components/Board';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const Header = styled.div`
  width: 100%;
  margin: 50px 0px;
  display: flex;
  justify-content: center;
`;
const AddBoardContainer = styled.div`
  width: 200px;
  height: 100px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  margin: 100px 0px;
`;

const DeleteArea = styled.div<IAreaProps>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${(props) => (props.isDraggingOver ? '#84817a' : 'red')};
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 10px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
}
function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source, type, draggableId } = info;

    if (!destination) return;

    //board 간의 이동
    if (type === 'board') {
      // setToDos((allBoards) => {
      //   const board = Object.keys(allBoards);
      //   board.splice(source.index, 1);
      //   board.splice(destination?.index, 0, draggableId);

      //   const newBoard: IToDoState = {};
      //   board.forEach((key) => {
      //     newBoard[key] = allBoards[key];
      //   });
      //   return newBoard;
      // });
      // return;
      setToDos((prev) => {
        const new_board = Object.entries(prev);
        const [temp] = new_board.splice(source.index, 1);
        new_board.splice(destination.index, 0, temp);
        return new_board.reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value,
          }),
          {}
        );
      });
    } else if (destination?.droppableId === 'Delete') {
      // 휴지통으로 리스트를 움직일 경우
      setToDos((allBoard) => {
        const sourceBoard = [...allBoard[source.droppableId]];
        sourceBoard.splice(source.index, 1);
        return { ...allBoard, [source.droppableId]: sourceBoard };
      });
    } else {
      if (destination?.droppableId === source?.droppableId) {
        // 같은 board안에서 리스트를 움직일 경우
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          const taskObj = boardCopy[source.index];
          boardCopy.splice(source.index, 1);
          boardCopy.splice(destination?.index, 0, taskObj);
          return { ...allBoards, [source.droppableId]: boardCopy };
        });
      } else if (destination?.droppableId !== source?.droppableId) {
        // 다른 board로 리스트를 움직일 경우
        setToDos((allBoard) => {
          const sourceBoard = [...allBoard[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          const destinationBoard = [...allBoard[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination?.index, 0, taskObj);
          return {
            ...allBoard,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
    }
  };

  return (
    <Container>
      <Header>
        <AddBoardContainer>
          <AddBoard />
        </AddBoardContainer>
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Droppable droppableId="board" type="board" direction="horizontal">
            {(magic) => (
              <Boards ref={magic.innerRef} {...magic.droppableProps}>
                {Object.keys(toDos).map((boardId, index) => (
                  <Board
                    boardId={boardId}
                    key={boardId}
                    toDos={toDos[boardId]}
                    boardIndex={index}
                  />
                ))}
                {magic.placeholder}
              </Boards>
            )}
          </Droppable>
        </Wrapper>
        <Droppable droppableId="Delete">
          {(magic, snapshot) => (
            <>
              <DeleteArea
                isDraggingOver={snapshot.isDraggingOver}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                Delete
              </DeleteArea>
              {magic.placeholder}
            </>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

export default App;
