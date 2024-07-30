"use client";

import { signIn, signOut } from "next-auth/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { setUser } from "@/store/userslice";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  useEffect(() => {
    signOut({
      redirect: false,
    });
  }, []);
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (login?.ok) {
      toast({ title: "Correct login" });
      const userExistData = await axios.get(
        `https://trello-backend-kkt8.onrender.com/api/user/userDetails?email=${email}`
      );
      const userdata = userExistData.data;
      dispatch(setUser(userdata));
      router.push("/");
    } else if (login?.error) {
      toast({ title: "Error! Please Try Again" });
    }

    setLoading(false);
  };

  return (
    <Card className=" w-[400px]">
      <CardHeader className="space-x-auto  flex justify-center items-center">
        <CardTitle className="text-2xl text-textnormal font-bold">Welcome to <span className="text-textbrand">Workflo</span>!</CardTitle>
        
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="Your Email"
             className="bg-[#EBEBEB] focus:border outline-none focus:outline-none focus:border-[#999999]"
            />
          </div>
          <div className="space-y-2">
            
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              type="password"
              placeholder="Password"
              className="bg-[#EBEBEB] focus:border outline-none focus:outline-none focus:border-[#999999]"
            />
          </div>
          <Button type="submit" onClick={login} className="w-full bg-gradient-to-t from-[#4B36CC] to-[#9C93D4] hover:bg-gradient-to-t hover:from-[#4C38C2] hover:to-[#2F2188]">
            Login
          </Button>
          <div className="text-sm text-center text-neutral-500 mt-5">
          Dont have an account? Create a {" "}
          <Link href={"/signup"} className="font-bold text-[#0054A1]">
             new account
          </Link>
        </div>
        </div>
      </CardContent>
    </Card>
  );
}
