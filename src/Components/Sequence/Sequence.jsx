import React, { useState } from "react";
import { mockDoctors } from "../../DataMock";
import QuoteApp from "./SequenceDnD";

const doctorMock = mockDoctors[0]
let allRoomsMock = ["1b","1c","1d","1e","1f"]

function Sequence({sidebar}) {
    const [activeRoomsState,setActiveRooms]=useState([...doctorMock.rooms])
    const [inactiveRoomsState,setInactiveRooms]=useState(allRoomsMock.filter(e => !activeRoomsState.includes(e)))
  return (
    <div className="bg-gray-100">
      <QuoteApp initial={quoteMap} sidebar={sidebar}/>
    </div>
  );
}

const alpha = 'alpha';
const beta = 'beta';

const quoteMap = {
    [alpha]: ["1b","1c","1d"],
    [beta]: ["1e","1f"],    
  };

export default Sequence;
