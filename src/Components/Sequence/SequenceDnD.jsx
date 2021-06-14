// @flow
import React, { Component } from "react";
import { DragDropContext } from "aligned-rbd"; 


import styled from "styled-components";
//import { DragDropContext } from "react-beautiful-dnd";
import AuthorList from "./authorList";

const grid = 8;

const Root = styled.div`
  box-sizing: border-box;
  padding: ${grid * 2}px;
  min-height: 100vh;
  /* flexbox */
  display: flex;
  flex-direction: column;
`;

export default class QuoteApp extends Component {
  state = {
    quoteMap: this.props.initial,
  };

  onDragEnd = (result) => {
    // // dropped outside the list
    if (!result.destination) {
      return;
    }

    this.setState(
      reorderQuoteMap({
        quoteMap: this.state.quoteMap,
        source: result.source,
        destination: result.destination,
      })
    );
    console.log("from ", result.source, " dropped on ", result.destination);
  };
  render() {
    const { quoteMap } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Root className="bg-gray-100">
          {Object.keys(quoteMap).map((key) => (
            <AuthorList
              sidebar={this.props.sidebar}
              internalScroll
              key={key}
              listId={key}
              listType="CARD"
              quotes={quoteMap[key]}
            />
          ))}
        </Root>
      </DragDropContext>
    );
  }
}

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderQuoteMap = ({ quoteMap, source, destination }) => {
  const current = [...quoteMap[source.droppableId]];
  const next = [...quoteMap[destination.droppableId]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...quoteMap,
      [source.droppableId]: reordered,
    };
    return {
      quoteMap: result,
    };
  }
  // moving to different list
  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result = {
    ...quoteMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return {
    quoteMap: result,
  };
};

export function moveBetween({ list1, list2, source, destination }) {
  const newFirst = Array.from(list1.values);
  const newSecond = Array.from(list2.values);

  const moveFrom = source.droppableId === list1.id ? newFirst : newSecond;
  const moveTo = moveFrom === newFirst ? newSecond : newFirst;

  const [moved] = moveFrom.splice(source.index, 1);
  moveTo.splice(destination.index, 0, moved);

  return {
    list1: {
      ...list1,
      values: newFirst,
    },
    list2: {
      ...list2,
      values: newSecond,
    },
  };
}
