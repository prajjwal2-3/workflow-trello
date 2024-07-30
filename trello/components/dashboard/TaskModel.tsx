'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import share from '../../public/share.svg';
import { ColumnType,CardType } from "../KanbanBoard";
import { Calendar as CalendarIcon  } from "lucide-react";
import { format } from "date-fns"
import { Plus } from "lucide-react";
import fav from '../../public/fav.svg';
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import full from '../../public/full.svg';
import { Dispatch, FormEvent, SetStateAction } from "react";
import status from '../../public/status.svg';
import priorityimg from '../../public/priority.svg';
import { Calendar } from "@/components/ui/calendar";
import deadline from '../../public/deadline.svg';
import descriptionimg from '../../public/description.svg';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import Image from "next/image";
import create from '../../public/new.svg';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { RootState } from "@/store/store";
import { useState } from "react";
import { addCard } from "@/store/cardslice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
interface TaskModelProps {
  column?: ColumnType;
}

   
export default function TaskModel({ column }: TaskModelProps) {
  
  const user = useSelector((state: RootState) => state.user);
  const { toast } = useToast();
    const [deadlineDate,setDeadlineDate]=useState<Date>();
     const [text, setText] = useState("");
     const [description,setDescription]=useState('');
     const [priority, setPriority] = useState('low');
     const [adding, setAdding] = useState(false);
     const [columnOptions,setColumnOptions]=useState<ColumnType>(column?column:'todo'); 
     const dispatch = useDispatch<AppDispatch>();
     const selectCards = (state: RootState) => state.cards;
     const cards = useSelector(selectCards);
 
     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
       e.preventDefault();
     
     console.log('adding card process started...')
     console.log('text:',text)
       if (!text.trim().length){
        console.log('deskj')
        toast({ title: "Please enter a title",variant:'destructive' });
        return
       };
   
       const newCard = {
         timeAdded: new Date().toISOString(),
         priority: priority as  "Low" | "Medium" | "Urgent",
         column:columnOptions,
         deadline:deadlineDate?.toISOString(),
         description,
         title: text.trim(),
         user:user.user?._id
         // id: Math.random().toString(36),
         // index: newIndex
       };
   
      dispatch(addCard(newCard))
        .then(() => {
          toast({ title: "New Task Card Added" });
        })
        .catch((error) => {
          console.error("Error adding card:", error);
          toast({ title: "Error adding card",variant:'destructive' });
        });
     };
  return (
    <div className="w-full">
      <Sheet>
        <SheetTrigger asChild className="my-2">
          {
            column?<motion.button
            layout 
            className="flex w-full justify-between items-center bg-gradient-to-b from-[#3A3A3A] to-[#202020] gap-1.5 p-2 rounded-lg h-10 text-sm text-neutral-400 transition-colors hover:text-neutral-50"
          >
            <span>Add card</span>
            <FiPlus size={20}/>
          </motion.button>:
          <Button className="w-full h-12 flex gap-2 bg-gradient-to-b border border-[#9C93D4] from-[#4C38C2] to-[#2F2188]">
            Create new task
            <Image src={create} alt="new task" width={24} height={24} />
          </Button>
          }
        
          
        </SheetTrigger>
        <SheetContent className="w-[45%]">
          <SheetHeader className="flex flex-row items-center ">
            <div className="w-7/12 flex items-center gap-2 mt-1 h-10 ">
              <SheetClose asChild>
                <X className="h-6 w-6 opacity-60 hover:opacity-100 cursor-pointer" />
              </SheetClose>
              <Image src={full} alt="new task" width={24} height={24} />
            </div>
            <div className="w-5/12 flex flex-row justify-around items-center">
              <Button variant='secondary' className="w-fit text-textsecondary text-base gap-2 !my-0 ">Share
                <Image src={share} alt="new task" width={24} height={24} />
              </Button>
              <Button variant='secondary' className="w-fit text-textsecondary text-base gap-2 !my-0 ">Favorite
                <Image src={fav} alt="new task" width={24} height={24} />
              </Button>
            </div>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Input className="border-none h-20  !py-0 text-5xl  font-semibold " placeholder="Title" onChange={(e)=>{
              setText(e.target.value)
            }}>
            </Input>
           
              <section className="flex w-full items-center">
                <section className="flex w-4/12">
                  <Image
                    src={status}
                    alt="status"
                    width={24} height={24}
                  />
                  <p className="pl-5">Status</p>
                </section>
                <Select value={column} onValueChange={(value)=>{
                  setColumnOptions(value as ColumnType)
                }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="To do" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="inprogress">In Progress</SelectItem>
                      <SelectItem value="underreview">Under Review</SelectItem>
                      <SelectItem value="finished">Finished</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </section>
            
            <section className="flex w-full items-center">
              <section className="flex w-4/12">
                <Image
                  src={priorityimg}
                  alt="status"
                 
                />
                <p className="pl-5">Priority</p>
              </section>
              <Select onValueChange={(value)=>setPriority(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                   
                  </SelectGroup>
                </SelectContent>
              </Select>
            </section>
            <section className="flex w-full items-center">
              <section className="flex w-4/12">
                <Image
                  src={deadline}
                  alt="status"
                />
                <p className="pl-5">Deadline</p>
              </section>
              <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[160px] xl:w-[180px] justify-start text-left font-normal",
                        !deadlineDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadlineDate ? format(deadlineDate, "PPP") : <span>Pick Deadline</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      
                      selected={deadlineDate}
                      onSelect={(date)=>{
                        setDeadlineDate(date)
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
            </section>
            <section className="flex w-full items-center">
              <section className="flex w-6/12">
                <Image
                  src={descriptionimg}
                  alt="status"
                />
                <p className="pl-5">Description</p>
              </section>
              <Input value={description} className="border " placeholder="Description" onChange={(e)=>{
                setDescription(e.target.value)
              }}/>
            </section>
            <section className="flex w-full mt-4 items-center">
              <section className="flex w-6/12">
                <Plus />
                <p className="pl-5 font-semibold text-black">Add custom property</p>
              </section>
            </section>
          </div>
          
          <SheetFooter className="mb-3">
            
              <Button  onClick={(e)=>{
                // @ts-ignore 
                handleSubmit(e)
              }}>Save changes</Button>
           
          </SheetFooter>
          <Separator/>
        </SheetContent>
      </Sheet>
    </div>
  );
}
