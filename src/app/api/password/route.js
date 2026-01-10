import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers"
import Password from "@/model/Password";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import CryptoJS from 'crypto-js';


export async function POST(request) {
    await dbConnect();

    try {
        const { title, webUrl, identifier, password, description } = await request.json();
        const cookieStore = await cookies();
        const token = cookieStore.get("PasswordBoxToken")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const MasterKey = process.env.MASTER_KEY+decoded.id_;

        const encryptPassword = (password, masterKey) => {
            return CryptoJS.AES.encrypt(password, masterKey).toString();
        };

        const newPassword = new Password({
            userId: decoded.id_,
            userEmail: decoded.email,
            title,
            webUrl,
            identifier,
            Password: encryptPassword(password, MasterKey),
            Description: description
        })

        await newPassword.save();

        return NextResponse.json({ message: "Password saved successfully" }, { status: 200 });

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


// Yeh function DB se nikaal kar wapas dikhane ke liye hai
// const decryptPassword = (encryptedPassword, masterKey) => {
//   const bytes = CryptoJS.AES.decrypt(encryptedPassword, masterKey);
//   return bytes.toString(CryptoJS.enc.Utf8);
// };
