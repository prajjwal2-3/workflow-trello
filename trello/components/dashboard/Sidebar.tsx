import Image from "next/image"
import portfolio from '../../public/profile.svg'
import Usercard from "./Usercard"
import { Download } from "lucide-react"
import bell from '../../public/bell.svg'
import update from '../../public/update.svg'
import close from '../../public/close.svg'
import Logout from "./Logout"
import Navigation from "./Navigation"
import TaskModel from "./TaskModal"

export default function Sidebar() {
    
  return (
    <div className="w-2/12 p-5 fixed border-r h-screen flex flex-col justify-between">
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Image
            src={portfolio}
            alt="logo"
            width={40}
            height={40}
          />
          <Usercard className="font-medium text-lg text-[#080808]"/>
          </div>
          <div className="flex items-center justify-between">
            <section className="flex gap-2">
            <Image
            src={bell}
            alt="bell"
            />
            <Image 
            src={update}
            alt="update"
            />
            <Image
            src={close}
            alt="close"
            />
            </section>
            <section>
             <Logout/>
            </section>
          </div>
          <div className="">
            <Navigation/>
            <TaskModel/>
          </div>
      </section>
      <section className="bg-[#F3F3F3] text-[#666666] flex p-2 items-center gap-2 rounded-md">
       <Download/>
       <section>
        <p className="text-lg font-medium">Download the app</p>
        <p className="text-sm">Get the full experience</p>
       </section>
      </section>
    </div>
  )
}
