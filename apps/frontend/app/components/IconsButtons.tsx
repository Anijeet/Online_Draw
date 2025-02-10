import React, { ReactNode } from 'react'

const IconsButtons = ({icon,onClick,activated,shortKey}:{
    icon:ReactNode,
    onClick:()=>void,
    activated?:boolean,
    shortKey: number
}) => {
  return (
    <div className={`p-2 cursor-pointer  rounded-lg hover:bg-gray-700 ${activated ? 'text-orange-500': 'text-white'}` }onClick={onClick}>
        <div>{icon}</div>
    </div>
  )
}

export default IconsButtons