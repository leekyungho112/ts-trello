import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? '#0a3d62' : props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 10px;

  box-shadow: ${(props) =>
    props.isDragging ? '0 2px 10px rgba(255,255,255,0.4)' : 'none'};
  span {
    word-wrap: break-word;
  }
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const DragabbleCard = ({ toDoId, toDoText, index }: IDragabbleCardProps) => {
  return (
    <Draggable draggableId={toDoId + ''} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <span>{toDoText}</span>
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
