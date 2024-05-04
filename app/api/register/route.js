import {NextResponse} from "next/server"
import User from '@/models/user.js';
import Department from '@/models/department.js';



export async function POST(req) {
    try {

        const{username, email, password,department} = await req.json();


        
        await Department.department_register(department)
        
        const departmentId  = await Department.getDepartmentIdByName(department);
        console.log("DepartmentID: ",departmentId)

        // console.log("Username:", username);
        // console.log("Email:",email);
        // console.log("Password:  ",password);
        // console.log("Confirm Password:",confirmPassword);
        // console.log("Department:",department);
        // await Department.department_register(department);
        await User.register(username, email, password,departmentId)
        
    

        return NextResponse.json({ message:"User registered."}, 
        {status: 201});
    } catch(error)  {
        return NextResponse.json({
            message: "An error occured while registering the user."},
            {status: 500});
    }
}