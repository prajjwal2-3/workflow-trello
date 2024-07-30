import home from "../../public/home.svg";
import board from "../../public/board.svg";
import setting from "../../public/setting.svg";
import team from "../../public/teams.svg";
import analytics from "../../public/analytics.svg";
import Image from "next/image";
export default function Navigation() {
  return (
    <div className="flex flex-col gap-1">
      <section className="bg-[#F4F4F4]  border border-[#DDDDDD] cursor-pointer flex items-center px-2 gap-2 w-full h-10 rounded">
        <Image src={home} alt="home" />
        <p className="text-textsecondary font-normal text-base">Home</p>
      </section>
      <section className=" cursor-pointer hover:bg-[#F4F4F4]  hover:border border-[#DDDDDD] flex items-center px-2 gap-2 w-full h-10 rounded">
        <Image src={board} alt="home" />
        <p className="text-textsecondary font-normal text-base">Boards</p>
      </section>
      <section className="cursor-pointer hover:bg-[#F4F4F4]  hover:border border-[#DDDDDD]  flex items-center px-2 gap-2 w-full h-10 rounded">
        <Image src={setting} alt="home" />
        <p className="text-textsecondary font-normal text-base">Settings</p>
      </section>
      <section className=" cursor-pointer hover:bg-[#F4F4F4]  hover:border border-[#DDDDDD] flex items-center px-2 gap-2 w-full h-10 rounded">
        <Image src={team} alt="home" />
        <p className="text-textsecondary font-normal text-base">Teams</p>
      </section>
      <section className=" cursor-pointer hover:bg-[#F4F4F4] hover:border border-[#DDDDDD] flex items-center px-2 gap-2 w-full h-10 rounded">
        <Image src={analytics} alt="home" />
        <p className="text-textsecondary font-normal text-base">Analytics</p>
      </section>
    </div>
  );
}
