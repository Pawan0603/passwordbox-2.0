import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
var jwt = require('jsonwebtoken');
import { cookies } from "next/headers";

export async function POST(request){
    await dbconnect();
    try {
        const {email, password} = await request.json();
        const user = await UserModel.findOne({email: email});

        console.log(email, password)
    
        if (!user) return Response.json({ success: false, message: "User not found" }, { status: 400 });

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) return Response.json({ success: false, message: "Invalid password" }, { status: 400 });

        var token = jwt.sign({ id_: user._id, email: user.email, name: user.name }, process.env.jwtSecreat);

        const cookieStore = await cookies()
        cookieStore.set("PasswordBoxToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: '/',
        })

        return Response.json({ success: true, message: "User logged in successfully", data: { id_: user._id, email: user.email, name: user.name } }, { status: 200 })

    } catch (error) {
        console.error("Error login user", error);
        return Response.json(
            {
                success: false,
                message: "Internal server error"
            },
            {
                status: 500
            }
        )
    }
}