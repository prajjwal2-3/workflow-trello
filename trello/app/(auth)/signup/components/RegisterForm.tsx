
"use client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  name_validator,
  email_validator,
  password_validator,
} from "@/lib/Validator";
import axios from "axios";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
const uservalidation = z.object({
  username: name_validator,
  email: email_validator,
  password: password_validator,
});
export default function Signup() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setuser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isloading, setisloading] = useState(false);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setuser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }
  async function registerUser() {
    const validation = uservalidation.safeParse(user);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => err.message);
      toast({ title: errors.toLocaleString() });
    }
    try {
      setisloading(true);
    const newUser =  await axios.post("/api/register", { user });
        console.log(newUser.status);
        if(newUser.status === 200){
            toast({ title: "Registration Successful" });
            router.push("/signin");
      }else {
        toast( { title: "Registration Failed", });
      }
      
     
    } catch (err) {
      setisloading(false);
      toast({ title: `Register ERR ${err}` });
    } finally {
      setisloading(false);
    }
  }
  return (
    <Card className="w-[400px]">
     <CardHeader className="space-x-auto  flex justify-center items-center">
        <CardTitle className="text-2xl text-textnormal font-bold">Welcome to <span className="text-textbrand">Workflo</span>!</CardTitle>
        
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-4">
            <section>
                
                <Input
                  name="username"
                  value={user.username}
                  id="username"
                  placeholder="Full name"
                  className="bg-[#EBEBEB] focus:border outline-none focus:outline-none focus:border-[#999999]"
                  onChange={handleChange}
                />
              </section>
              <section>
              
                <Input
                  name="email"
                  value={user.email}
                  id="email"
                  placeholder="Your Email"
              className="bg-[#EBEBEB] focus:border outline-none focus:outline-none focus:border-[#999999]"
                  onChange={handleChange}
                />
              </section>
              
            </div>
            <section>
             
              <Input
                name="password"
                value={user.password}
                id="password"
                placeholder="Password"
                 className="bg-[#EBEBEB] focus:border outline-none focus:outline-none focus:border-[#999999]"
                type="password"
                onChange={handleChange}
              />
            </section>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button type="submit" onClick={registerUser} className="w-full bg-gradient-to-t from-[#4B36CC] to-[#9C93D4] hover:bg-gradient-to-t hover:from-[#4C38C2] hover:to-[#2F2188]">
          Sign Up
        </Button>
        <div className="text-sm text-center text-neutral-500 mt-5">
        Already have an accout?{" "}
          <Link href={"/signin"} className="font-bold text-[#0054A1]">
            Log in
          </Link>
        </div>
      </CardFooter>
      
    </Card>
  );
}
