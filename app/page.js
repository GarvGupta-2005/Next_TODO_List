"use client"

import Todo from "@/components/Todo";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
  import { ToastContainer, toast } from 'react-toastify';


export default function Home() {

  const [formData,setFormData] = useState({
    title:"",
    description:""
  })

  const [tododata,setToDo] = useState([])

  const fetchTodo = async ()=>{
    const repsonse = await axios('/api')

    setToDo(repsonse.data.todos)
  }

  const deleteToDo = async(mongoId)=>{
    const response = await axios.delete('/api',{
      params:{
        mongoId:mongoId
      }
    })

    toast.success(response.data.msg)

    await fetchTodo()
  }

  const completeToDO = async(id)=>{
    const response = await axios.put('/api',{},{
      params:{
        mongoId:id
      }
    })

    toast.success(response.data.msg)
    await fetchTodo()
  }

  useEffect(()=>{
     fetchTodo()
  },[])

  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setFormData(form=>({...form,[name]:value}))


  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    try {
      //api code

      const response =  await axios.post('/api',formData)

      toast.success( response.data.msg)
      setFormData({
        title:"",
    description:""
      })

     await fetchTodo()
    } catch (error) {
      toast.error("Failed the Addition")
    }
  }

  return (
    <>
    <ToastContainer/>
    <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 mx-auto">
      <input value={formData.title} onChange={onChangeHandler} type="text" name="title" placeholder="Enter Title" className="px-3 py-2 border-2 w-full"/>
      <textarea value={formData.description} onChange={onChangeHandler} name="description" placeholder="Enter Description" className="px-3 py-2 border-2 w-full"></textarea>
      <button type="submit" className="bg-orange-600 py-3 px-11 text-white cursor-pointer">Add todo</button>
    </form>

    

<div className="relative overflow-x-aut mt-24 w-[60%] mx-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Id
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                 <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {tododata.map((item,index)=>{
              return <Todo key={index} id={index} title={item.title} description={item.description} isCompleted={item.isCompleted} mongoId = {item._id} deleteToDo={deleteToDo} completeToDO={completeToDO}/>
            })}
        </tbody>
    </table> 
</div>

    </>
  );
}
