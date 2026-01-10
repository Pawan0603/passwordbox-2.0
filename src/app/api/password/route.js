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

    const MasterKey = process.env.MASTER_KEY + decoded._id;

    const encryptPassword = (password, masterKey) => {
      return CryptoJS.AES.encrypt(password, masterKey).toString();
    };

    const newPassword = new Password({
      userId: decoded._id,
      userEmail: decoded.email,
      title,
      webUrl,
      identifier,
      Password: encryptPassword(password, MasterKey),
      Description: description
    })

    const savedPassword = await newPassword.save();

    return NextResponse.json({ message: "Password saved successfully", data: savedPassword }, { status: 200 });

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


export async function GET(request) {
  await dbConnect();

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("PasswordBoxToken")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const passwords = await Password.find({ userId: decoded._id });

    return NextResponse.json({ passwords }, { status: 200 });

  } catch (error) {
    console.error("Error fetching passwords", error);
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


export async function PUT(request) {
  await dbConnect();

  try {
    const { _id, title, webUrl, identifier, password, description } = await request.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("PasswordBoxToken")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const MasterKey = process.env.MASTER_KEY + decoded._id;

    const encryptPassword = (password, masterKey) => {
      return CryptoJS.AES.encrypt(password, masterKey).toString();
    };

    const updatedData = {
      title,
      webUrl,
      identifier,
      Password: encryptPassword(password, MasterKey),
      Description: description
    };

    let updatedPassword = await Password.findByIdAndUpdate(
      _id,
      updatedData,
      { new: true }
    );

    return NextResponse.json({ message: "Password updated successfully", updatedPassword }, { status: 200 });
  } catch (error) {
    console.error("Error fetching passwords", error);
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

export async function DELETE(request) {
  await dbConnect();
  try {
    const { _id } = await request.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("PasswordBoxToken")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await Password.findByIdAndDelete(_id);  

    return NextResponse.json({ message: "Password deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting password", error);
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
