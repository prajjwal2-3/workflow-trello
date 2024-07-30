import React from "react";
import RegisterForm from "./components/RegisterForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#FFFFFF] to-[#AFA3FF] flex items-center justify-center ">
      <div className="">
        <RegisterForm />
        
      </div>
    </div>
  );
}
