import React from 'react'
import {ReactComponent as IconEdit} from './../../iconEdit.svg'

const alertsMock = [{
    text:"lorem lorem lorem"
},{
    text:"lorem lorem lorem2"
},{
    text:"lorem lorem lorem3"
}]

function Alerts() {
    return (
        <div className="h-screen w-full">
            <div className="h-1/5 w-full flex items-center justify-end"><button className="mr-24 py-3  px-10 rounded-3xl bg-green-300">add new</button></div>
            <div className="h-4/5 w-full  flex flex-col items-center" >
                
                {alertsMock.map((e,i)=>(
                    <Alert text={e.text} id={i} key={i}/>
                ))}
               

            </div>
        </div>
    )
}

function Alert({text,id}){
    return (
        <div className="w-2/3 bg-white grid grid-cols-12 mb-2 rounded-tl-2xl rounded-br-2xl h-14 overflow-hidden">
        <div className="col-span-1 "><div className="bg-green-300 w-1/2 text-center h-full flex flex-col justify-center rounded-br-2xl">{id+1}</div></div>
        <div className="col-span-8  flex items-center">{text}</div>
        <div className="col-span-2  flex items-center justify-center"> <div className="bg-gray-900 w-9 h-9 rounded-circular"></div></div>
        <div className="col-span-1 flex items-center"><IconEdit stroke="rgb(110, 231, 183)"/></div>


        </div>
    )
}

export default Alerts
