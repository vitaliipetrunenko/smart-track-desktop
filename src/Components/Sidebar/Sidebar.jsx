import React, { useEffect, useState } from 'react'
import { classNames } from '../../App'
import { NavLink } from "react-router-dom";
import {ReactComponent as Icon1} from './../../iconMain.svg';
import {ReactComponent as IconLogOut} from './../../iconLogOut.svg';
import {ReactComponent as IconStaff} from './../../iconStaff.svg';
import {ReactComponent as IconAlerts} from './../../iconAlerts.svg';
import {ReactComponent as IconSequence} from './../../iconSequence.svg';
import {ReactComponent as IconArrow} from './../../arrow.svg';
import { useLocation } from "react-router-dom";

const sidebarLinkStyle="sidebar-link transform transition-color duration-700 flex mob:justify-center text-white my- text-lg leading-5 w-11/12 rounded-l-2xl  ml-auto text-left  h-14 py-4 "


function Sidebar({sidebar,setSidebar}) {
    
    
    let location = useLocation().pathname
   
    return (
        <div className={classNames(sidebar ? "transform  transition-transform duration-700  " : "z-10 transform -translate-x-full transition-transform duration-700 flex-shrink  " ,"absolute w-1/5   overflow-x-visible h-screen bg-blue-900 flex flex-col justify-between")}>
        
        <div className="flex flex-col align-center text-center ">
        <div className="logo   pt-12  mx-auto pb-14 text-3xl text-white font-semibold">Logo</div>
        <button className={classNames(sidebar ? " transform rotate-180 duration-700 border-l-2  ":"transform duration-700  border-l-0 opacity-95 ", " box-border relative w-12 h-12 border-b-2 border-t-2 border-r-2 border-white  bg-blue-white-split focus:outline-none  rounded-circular self-end left-6 bottom-10")} onClick={()=>setSidebar(!sidebar)}>
            <IconArrow className={classNames(sidebar ? "left-6":"left-6" ,"w-5 h-5 transform -rotate-90 relative")} fill="white"/>

        </button>
        <SidebarNavlink color={location==="/home" ? "white" : "#6AC7BE" } text="Dashboard" url="/home" Icon={Icon1}  />
        <SidebarNavlink color={location==="/staff" ? "white" : "#6AC7BE" } text="Staff" url="/staff" Icon={IconStaff}  />
        <SidebarNavlink color={location==="/alerts" ? "white" : "#6AC7BE"} text="Alerts" url="/alerts" Icon={IconAlerts}  />
        <SidebarNavlink color={location==="/sequence" ? "white" : "#6AC7BE" } text="Sequence" url="/sequence" Icon={IconSequence}  />
        </div>
        <SidebarNavlink color={"transparent"} text="Sign Out" url="/login" fill="none" Icon={IconLogOut} optionalClass="my-16" />
      </div>
    )
}


 
function SidebarNavlink({text, Icon, url, optionalClass, color="white"}){

   
    
  
    
    return(
        <NavLink activeClassName="bg-green-300" className={sidebarLinkStyle + optionalClass} to={url}><Icon className="ml-5 mob:mr-5 flex-shrink-0" fill={color} stroke={color}/> <span className="mob:hidden flex-grow mr-5 pl-5">{text}</span></NavLink>
    )
}

export default Sidebar



