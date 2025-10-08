import { connectDB } from "@/lib/config/db";
import ToDoModel from "@/lib/models/todoModel";
import { NextResponse } from "next/server";

const loadDB = async()=>{
    await connectDB();
}

loadDB();

export async function GET(request) {

   const todos = await ToDoModel.find({}).lean();
return NextResponse.json({ todos });

}


export async function POST(request) {
    const {title,description} = await request.json();

    await ToDoModel.create({
        title,description
    })

    

    return NextResponse.json({msg:"ToDO Created"})
}


export async function DELETE(request)  {
    const mongoId = await request.nextUrl.searchParams.get("mongoId")
    await ToDoModel.findByIdAndDelete(mongoId)
    return NextResponse.json({msg:"ToDo Deleted!!"})
}



export async function PUT(request) { // Make sure `request` is the argument
    const mongoId = await request.nextUrl.searchParams.get("mongoId");
    await ToDoModel.findByIdAndUpdate(mongoId, {
        $set: {
            isCompleted: true,
        }
    });
    return NextResponse.json({ msg: "ToDo Completed!!" });
}
