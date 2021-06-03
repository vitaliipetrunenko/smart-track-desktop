import React, { useState } from 'react'
import { mockDoctors } from '../DataMock'






function Dashboard() {
    let doctors = mockDoctors.map((e,i)=>(
        <DoctorLine name={e.name} profession={e.profession} currentAction={e.currentAction} line={e.line}></DoctorLine>
    ))
    return (
        <div className="w-full min-h-screen h-screen  bg-gray-200 flex overflow-y-scroll flex-col">
            {doctors}
            
        </div>
    )
}

function DoctorLine({name,profession,currentAction,line}) {
    const [lineLength, setLineLength]=useState(line.length)
    let events = line.map((e,i) => (
        <EventBox date={e.date} room={e.room} currentState={e.currentState}/>
    ))
    return (
        <div className="flex items-center justify-start h-56 flex-shrink-0 bg-gray-200 w-full overflow-x-scroll">
            <div className=" min-w-twoHpx w-1/4 h-full flex-shrink-0 mr-6 overflow-hidden p-8  flex items-start justify-around flex-col">
               <h1 className="text-2xl max-w-twoHpx">{name}</h1> 
                <div>{profession} </div> 
                
                <hr  className="w-11/12 border-black"/>
                <div className="flex justify-between items-center w-full"><button className="font-bold" onClick={()=>{setLineLength(lineLength+1)}}>+</button>{lineLength}<button className="font-bold" onClick={()=>{setLineLength(lineLength-1)}}>-</button> <span>in line</span><button className="border-yellow-600 text-yellow-600 border-2 px-2 leading-6 rounded-3xl">stop the line</button></div>
            </div>
            
            
                     {events} 
            
        </div>
    )
}


function EventBox({date,room,currentState}) {
    return (
        <div className="w-52 h-5/6 mr-6 rounded-tr-3xl grid grid-cols-3 grid-rows-4 rounded-l-3xl flex-shrink-0 overflow-hidden bg-white">
            <div className="bg-gray-100"><div className="h-full bg-green-300 rounded-br-3xl text-center leading-6 flex justify-center items-center">{room}</div></div>
            <div className="bg-gray-100"></div>
            <div className="bg-gray-100 text-center leading-6 flex justify-center items-center text-yellow-500 ">{date.getHours() + ":" +date.getMinutes()} <br/></div>
            <div className="row-span-2 col-span-3 flex items-center justify-center"><div className="w-16 h-16 bg-gray-700 rounded-circular"></div> </div>
                <div className="col-span-3 text-center">state: {currentState}</div>
                 
        </div>
    )
}




export default Dashboard

