import { CustomKanban } from "../KanbanBoard"
import Features from "./Features"
import Options from "./Options"
import Usercard from "./Usercard"
import { CircleHelp } from "lucide-react"
export default function Mainboard() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen px-4 py-8 ">
      <section className="flex justify-between">
        <section className="flex">
        <span className="text-4xl font-semibold">Good morning, </span>
        <Usercard className="text-4xl font-semibold"/>
        {" "}
        <span className="text-4xl font-semibold">!</span>
        </section>
        <button className="flex text-lg mr-4 gap-2">Help & feedback
            <CircleHelp/>
        </button>
      </section>
      <section className="my-6">
        <Features/>
      </section>
      <section className="mb-6">
<Options/>
      </section>
      <CustomKanban/>
    </div>
  )
}
