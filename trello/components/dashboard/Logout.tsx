'use client'
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"
export default function Logout() {
  return (
    <div className="">
        <Button variant={"secondary"} onClick={()=>{
            signOut()
        }}>
    <p className="text-[#797979] text-base font-normal">Logout</p>
  </Button>
    </div>
  )
}
