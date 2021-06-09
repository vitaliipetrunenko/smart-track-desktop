import React, { useEffect, useState } from "react";
import { classNames } from "../../App";
import { mockDoctors,mockAssistants,mockReceptionists } from "../../DataMock";

function loadProfiles(tab){
    switch (tab){
        case "Doctors":
            return mockDoctors;
        case "Assistants":
            return mockAssistants;
        case "Receptionists":
            return mockReceptionists;
        default : return []
    }


}



function Staff() {
  const [tab, setTab] = useState("Doctors")
    const [loadedProfiles,setLoadedProfiles] = useState([])
    const [toggleAddNewModal, setToggleAddNewModal] = useState(false)
    useEffect(()=>{
        setLoadedProfiles(loadProfiles(tab))
    },[tab])
    let shownProfiles = loadedProfiles.map((e,i)=>(
        <div key={i} className="grid bg-white m-1 rounded-tl-3xl rounded-br-3xl  grid-cols-12  h-14 text-left"><span className=" bg-green-300 h-full rounded-tl-3xl w-9 flex justify-center items-center rounded-br-3xl col-span-1"><p>{i+1}</p></span><span className="col-span-2 flex items-center">{e.name}</span><span className="col-span-3 flex items-center" >{e.mail}</span><span className="col-span-3 flex items-center">{e.phone}</span><span className="col-span-3 flex items-center">{e.rooms}</span></div>
    ))
  return (
    <div className="w-full h-screen">
      <div className="h-1/6 w-full  flex justify-between items-center">
        <div className="w-1/3 flex justify-evenly items-center">
          <StaffButton
            text="Doctors"
            tab={tab}
            setTab={setTab}
          ></StaffButton>
          <StaffButton
            text="Assistants"
            tab={tab}
            setTab={setTab}
          ></StaffButton>
          <StaffButton
            text="Receptionists"
            tab={tab}
            setTab={setTab}
          ></StaffButton>
        </div>
        <button onClick={()=>{setToggleAddNewModal(true)}} className="mr-16 px-10 py-3 bg-green-300 rounded-3xl">
          Add new
          
        </button>
      </div>
      <div className="h-5/6 mx-10 flex flex-col justify-start">
      {toggleAddNewModal ? <div className="fixed w-full z-50 h-screen top-0 left-0 bg-gray-500 bg-opacity-60 flex items-center"><div className="bg-white max-w-md w-2/6 rounded-3xl h-52 mx-auto"></div></div> : null}
     {shownProfiles}
     </div>
    </div>
  );
}

function StaffButton({ text, tab, setTab }) {
  return (
    <button
      className={classNames(
        tab === text
          ? "text-green-300  transform transition-colors duration-1000"
          : "bg-transparent  transform transition-colors duration-1000 " ,
        "text-center  focus:outline-none h-12 flex items-center flex-col"
      )}
      onClick={() => {
        setTab(text);
      }}
    >
      {text}
      <div
        className={classNames(
          tab === text ? "" : "text-transparent",
          "relative -top-8 bold text-4xl"
        )}
      >
        _
      </div>
    </button>
  );
}

export default Staff;
