import React from 'react'

const Todo = ({id,title,description,isCompleted,mongoId,deleteToDo,completeToDO}) => {
  return (
    
        <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {id}
                </th>
                <td className="px-6 py-4">
                    {title}
                </td>
                <td className="px-6 py-4">
                    {description}
                </td>
                <td className="px-6 py-4">
                    {isCompleted===false?"pending":"done"}
                </td>
                <td className="px-6 py-4 flex gap-1">
                    <button onClick={()=>deleteToDo(mongoId)} className='py-2 px-4 bg-red-500 text-white'>Delete</button>

                    <button onClick={()=>completeToDO(mongoId)} className='py-2 px-4 bg-green-500 text-white'>Done</button>
                </td>
            </tr> 
  )
}

export default Todo