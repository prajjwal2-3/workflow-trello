import React from "react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="max-h-screen min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#AFA3FF] w-full my-auto flex items-center justify-center ">
      <div className="h-full my-auto">
        <LoginForm />
        
      </div>
    </div>
  );
}
