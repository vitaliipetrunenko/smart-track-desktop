import React, { useEffect, useState } from "react";

import { DndProvider, useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrop } from 'react-dnd';
import { mockDoctors } from "../../DataMock";
import {ReactComponent as IconEdit} from './../../iconEdit.svg'
import {ReactComponent as IconCross} from './../../iconCross.svg'

export const ItemTypes = {
    BOX: 'box'
  }

const doctorMock = mockDoctors[0]
let allRoomsMock = ["1b","1c","1d","1e","1f"]

function Sequence() {

    const [activeRoomsState,setActiveRooms]=useState([...doctorMock.rooms])
    const [inactiveRoomsState,setInactiveRooms]=useState(allRoomsMock.filter(e => !activeRoomsState.includes(e)))
   
   


  return (
    <DndProvider backend={HTML5Backend}>
    <div className="w-full h-screen">
      <div className="h-1/6 w-full  flex justify-between items-center">
          <div className="ml-20">
          Choose a doctor<br/>
          <select className=" border-black border-2 bg-transparent rounded-3xl py-3 px-10">
              <option value="">doctor1</option>
              <option value="">doctor2</option>
          </select>
          </div>
          <button className="mr-20 px-10 py-3 bg-green-300 rounded-3xl">save</button>
      </div>
      
     
        <div className="h-5/6">
      <div className="h-full w-full  overflow-y-scroll">
         <Container inactiveRoomsState = {inactiveRoomsState} setInactiveRooms={setInactiveRooms} activeRoomsState = {activeRoomsState} setActiveRooms={setActiveRooms}/>
      </div>
      </div>

      
    </div>
    </DndProvider>
  );
}

export const Box = function Box({ name,key,activeRoomsState,setActiveRooms, inactiveRoomsState,setInactiveRooms }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { name },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            console.log("WORKING on ", item.name)
             if (item && dropResult) {

                if((dropResult.name==="activeBOX" && activeRoomsState.includes(item.name)) || (dropResult.name==="inactiveBOX" && inactiveRoomsState.includes(item.name))){
                    console.log("catched dup")
                    console.log(item)
                }
                else{
                console.log(`You dropped ${item.name} into ${dropResult.name}!`);
                if(dropResult.name==="activeBOX"){
                    console.log("activated " + item.name)
                    setActiveRooms((values)=>[...values, item.name])
                    setInactiveRooms((values)=>values.filter(e => e !== item.name))
                }
                else if(dropResult.name==="inactiveBOX"){
                    setActiveRooms((values)=>values.filter(e => e !== item.name))
                    setInactiveRooms((values)=>[...values, item.name])
                    console.log("deactivated " , item.name)
                }
            }
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    //const opacity = isDragging ? 0.4 : 1;
   
    return (<div ref={drag} role="Box" className="bg-white m-5 rounded-t-3xl rounded-bl-3xl  text-black text-center grid grid-cols-5 grid-rows-4 h-48 w-64" data-testid={`box-${name}`}>
			<span className="flex items-center justify-center"><IconCross stroke="gray"/></span>
            <span className="mx-auto mt-auto w-20 h-20 rounded-circular bg-green-300 col-span-3 row-span-2 flex items-center justify-center">{name}</span>
            
            <span className="flex items-center justify-center"><IconEdit stroke="rgb(110, 231, 183)"/></span>
            <span></span>
            <span></span>
            <span className="col-span-5 row-span-2 flex items-center justify-center">Alex Sample</span>
		</div>);
};



export const Container = ({activeRoomsState,inactiveRoomsState,setInactiveRooms, setActiveRooms}) => {
    
    useEffect(() =>{
        console.log("rerendered with state "+ activeRoomsState + " and "+inactiveRoomsState);
    },[activeRoomsState,inactiveRoomsState])
    
    let activeBoxes = [...activeRoomsState].map((e,i) => <Box setActiveRooms={setActiveRooms} setInactiveRooms={setInactiveRooms} inactiveRoomsState={inactiveRoomsState} activeRoomsState={activeRoomsState}  name={e}/>)
    let inactiveBoxes = [...inactiveRoomsState].map((e,i) => <Box setActiveRooms={setActiveRooms} setInactiveRooms={setInactiveRooms} inactiveRoomsState={inactiveRoomsState} activeRoomsState={activeRoomsState}  name={e}/>)
    console.log("DEBUG activeboxes: ",activeBoxes )
    console.log("DEBUG inactiveboxes: ",inactiveBoxes )
    return (<div className="h-full w-11/12 mx-auto">
			<div className=" border-dashed border-green-300 bg-gray-100 border-4  flex " style={{ overflow: 'hidden', clear: 'both' }}>
				<Dustbin name="activeBOX" array={[...activeBoxes]} />
			</div>
			<div className="flex h-full " style={{ overflow: 'hidden', clear: 'both' }}>
            <Dustbin name="inactiveBOX" array={[...inactiveBoxes]} />
			</div>
		</div>);
};



const style = {
    
    width: '100%',
    marginRight: 'auto',
    
    color: 'white',
    
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};
const Dustbin = ({array,name}) => {
    
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.BOX,
        drop: () => ({name}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver;
    let backgroundColor = 'transparent';
    if (isActive) {
        backgroundColor = 'lightblue';
    }
    else if (canDrop) {
        backgroundColor = 'transparent';
    }
    return (<div ref={drop} role={'Dustbin'} style={{ ...style, backgroundColor }}>
			{/* {isActive ? 'Release to drop' : 'Drag a box here'} */}
            <div className="w-full   items-center flex">{array}</div>
            
		</div>);
};


export default Sequence;
