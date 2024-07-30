import Mainboard from '@/components/dashboard/Mainboard';
import Sidebar from '@/components/dashboard/Sidebar';
import { CustomKanban } from '@/components/KanbanBoard'
import { authOptions } from "@/lib/AuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from 'react'

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/signin");
  }
  return (
    <div className="flex h-screen ">
      <Sidebar/>
     <div className="ml-[16.5vw] ">
     <Mainboard/>
     </div>
    </div>
  )
}
