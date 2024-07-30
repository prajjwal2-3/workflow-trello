import { NextResponse } from "next/server";
import axios from "axios";
import bcrypt from "bcrypt";
import { email_validator, password_validator } from "../../../lib/Validator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const BACKEND_URL = process.env.BACKEND_URL;
    const { email, username, password } = body.user;
    console.log(body.user)

    // Validate email and password
    try {
      email_validator.parse(email);
      password_validator.parse(password);
    } catch (validationError) {
      return new NextResponse("Invalid data: " + validationError, { status: 400 });
    }

    if (!email || !password) {
      return new NextResponse("Missing data", { status: 500 });
    }
    try {
        console.log('checking user existence')
       const userExistData= await axios.get(`https://trello-backend-kkt8.onrender.com/api/user/userDetails?email=${email}`);
        
        console.log(userExistData.data);
        const user = userExistData.data;

        if (user) {
            return new NextResponse("User Already Exists", { status: 500 });
        }
    } catch (err) {
        console.log("Error checking user existence: " + err);
        return NextResponse.json(err);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const optionsforCreatingUser = {
        method: 'POST',
        url: `https://trello-backend-kkt8.onrender.com/api/user`,
        headers: {'content-type': 'application/json'},
        data: {
          email,
          username,
          password: hashedPassword
        }
      };
      
    
   
      
        try{
            const newUser = await axios.request(optionsforCreatingUser);
        
        console.log('request gayi')
        return NextResponse.json(newUser.data);
        }catch(err){
            console.log('error aaya')
            return NextResponse.json(err);
        }
     
   
    
  } catch (err) {
    
    console.log("REGISTER_ERROR" + err);
    return NextResponse.json(err);
  }
}
