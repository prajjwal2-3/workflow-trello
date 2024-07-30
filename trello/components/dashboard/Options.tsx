import { Input } from "../ui/input";
import calender from "../../public/deadline.svg";
import { Button } from "../ui/button";
import auto from "../../public/auto.svg";
import filter from "../../public/filter.svg";
import create from "../../public/new.svg";
import Image from "next/image";
import share from "../../public/share.svg";
export default function Options() {
  const images = [calender, auto, filter, share];
  const data = [
    {
      title: "Calendar view",
      image: images[0],
    },
    {
      title: "Automation",
      image: images[1],
    },
    {
      title: "Filter ",
      image: images[2],
    },
    {
      title: "Share",
      image: images[3],
    },
  ];
  return (
    <div className="flex">
      <Input className="w-2/12" placeholder="Search"></Input>
      <div className="w-3/12"></div>
      <section className="w-7/12 flex justify-between">
      {
        data.map((item,index)=>
            <Button variant='secondary' key={index} className=" flex gap-3">
        <span className="text-base font-normal text-[#797979]">{item.title}</span>
          <Image src={item.image} alt="calendar" />
        </Button>)
      }
       <Button className=" flex gap-2 bg-gradient-to-b border border-[#9C93D4] from-[#4C38C2] to-[#2F2188]">
            Create new
            <Image src={create} alt="new task" width={24} height={24}/>
            </Button>
      </section>

    </div>
  );
}
