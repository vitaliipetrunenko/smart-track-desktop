// @flow
import React, { Component } from "react";
import styled from "styled-components";
import { colors } from "@atlaskit/theme";
import { Droppable, Draggable } from "aligned-rbd"; 
import { ReactComponent as IconEdit } from "./../../iconEdit.svg";
import { ReactComponent as IconCross } from "./../../iconCross.svg";
import { classNames } from "../../App";

const grid = 8;

const Wrapper = styled.div`
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? colors.B50 : "rgb(243,244,246)"};
  display: flex;
  flex-direction: column;
  padding: ${grid}px;
  user-select: none;
  transition: background-color 0.1s ease;
  margin: ${grid}px 0;
`;

const DropZone = styled.div`
  display: flex;
  /*
    Needed to avoid growth in list due to lifting the first item
    Caused by display: inline-flex strangeness
  */
  align-items: start;
  /* stop the list collapsing when empty */
  min-width: 600px;
  /* stop the list collapsing when it has no items */
  min-height: 60px;
  max-width: 100%;
  flex-wrap: wrap;
`;

const ScrollContainer = styled.div`
  max-width:100% ;
`;

// $ExpectError - not sure why
const Container = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    flex parent
    needed to allow width to grow greater than body
  */
  display: inline-flex;
`;

export default class AuthorList extends Component {
  static defaultProps = {
    isCombineEnabled: false,
  };
  renderBoard = (dropProvided) => {
    const { quotes } = this.props;
    console.log(this.props);
    return (
      <Container>
        <DropZone ref={dropProvided.innerRef}>
          {quotes.map((quote, index) => (
            <Draggable key={quote} draggableId={quote} index={index}>
              {(dragProvided, dragSnapshot) => {
                console.log(this.props.sidebar);
                if (dragSnapshot.isDragging && this.props.sidebar) {
                  dragProvided.draggableProps.style.left -=
                    window.innerWidth / 5;
                }
                return (
                  <Author
                    author={quote}
                    provided={dragProvided}
                    snapshot={dragSnapshot}
                  />
                );
              }}
            </Draggable>
          ))}
          {dropProvided.placeholder}
        </DropZone>
      </Container>
    );
  };

  render() {
    const { listId, listType, internalScroll, isCombineEnabled } = this.props;

    return (
      <Droppable
        droppableId={listId}
        type={listType}
        direction="grid"
        isCombineEnabled={isCombineEnabled}
      >
        {(dropProvided, dropSnapshot) => (
          <Wrapper
            isDraggingOver={dropSnapshot.isDraggingOver}
            {...dropProvided.droppableProps}
            className={classNames(
              listId === "alpha"
                ? "border-2 border-green-300 border-dashed "
                : "",
              "bg-gray-100 flex-wrap max-w-full"
            )}
          >
            {internalScroll ? (
              <ScrollContainer>
                {this.renderBoard(dropProvided)}
              </ScrollContainer>
            ) : (
              this.renderBoard(dropProvided)
            )}
          </Wrapper>
        )}
      </Droppable>
    );
  }
}

export class Author extends Component {
  render() {
    const author = this.props.author;
    const provided = this.props.provided;
    const snapshot = this.props.snapshot;

    return (
      <div
        ref={(ref) => provided.innerRef(ref)}
        className="bg-white m-5 rounded-t-3xl rounded-bl-3xl  text-black text-center grid grid-cols-5 grid-rows-4 h-48 w-64"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
      >
        <span className="flex items-center justify-center">
          <IconCross stroke="gray" />
        </span>
        <span className="mx-auto mt-auto w-20 h-20 rounded-circular bg-green-300 col-span-3 row-span-2 flex items-center justify-center">
          {author}
        </span>
        <span className="flex items-center justify-center">
          <IconEdit stroke="rgb(110, 231, 183)" />
        </span>
        <span></span>
        <span></span>
        <span className="col-span-5 row-span-2 flex items-center justify-center">
          Alex Sample
        </span>
      </div>
    );
  }
}
