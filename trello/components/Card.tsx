import { CardType } from "./KanbanBoard";
import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { DropIndicator } from "./KanbanBoard";
import { AppDispatch, RootState } from "@/store/store";
import { updateCard,deleteCard } from "@/store/cardslice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";
import LiveTimediff from "./dashboard/LiveTimediff";
import { buttonVariants } from "./ui/button";
type CardProps = CardType & {
  handleDragStart: (e: React.DragEvent, card: CardType) => void;
  // setCards: Dispatch<SetStateAction<CardType[]>>;
};

export const Card = ({
  title,
  _id,
  deadline,
  description,
  column,
  handleDragStart,
  timeAdded,
  priority,

}: CardProps) => {
  const {toast}=useToast()
  const [text, setText] = useState(title);
  const [descriptionnow,setDescription]=useState(description);
  const [prioritynow, setPriority] = useState("Low");
  const user = useSelector((state: RootState) => state.user);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  function convertToITC(utcDateTimeString :string){
    const utcDate = new Date(utcDateTimeString);
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(utcDate.getTime() + istOffset);
    const formattedISTDate = istDate.toISOString().split('T')[0];
    return formattedISTDate
  }
  const handleSave = () => {
    dispatch(updateCard({
      _id,
      user:user.user?._id,
      deadline,
      description:descriptionnow,
      title: text,
      priority: prioritynow as "Low" | "Medium" | "Urgent",
      column,
      timeAdded,
    })).then(()=>{
      toast({title:'Card Updated'})
    });
    setIsEdit(false);
  };

  const handleDelete = () => {
   dispatch(deleteCard({
    data:{
      id:_id,
      user:user.user?._id,
     
    }
   })).then((()=>{
    toast({title:'Card Deleted'})
   }))
  };

  return (
    <>
      <DropIndicator beforeId={_id} column={column} />
      <motion.div
        layout
        layoutId={_id}
        draggable="true"
        onDragStart={(e) =>
          // @ts-ignore
          handleDragStart(e, { title, _id, column, priority, timeAdded })
        }
        className="cursor-grab rounded border border-[#DEDEDE] bg-[#F9F9F9] p-3 active:cursor-grabbing"
      >
        {!isEdit ? (
          <>
            <section className="flex flex-col gap-4">
            <p className="text-base text-[#606060]">{title}</p>
            <p className="font-normal text-[#797979] text-sm">
              {description}
            </p>
            <span className={`${priority==='Low'?'bg-[#0ECC5A]':priority==='Medium'?'bg-[#FFA235]':'bg-[#FF6B6B]'} p-1 w-fit rounded-lg` }>{priority}</span>
            <div className="font-semibold text-sm flex text-[#606060] items-center gap-2">
              <Clock3 size={24}/>
              {convertToITC(deadline)}</div>
            <LiveTimediff targetDateTime={timeAdded}/>
            </section>
          </>
        ) : (
          <>
          <label htmlFor="edittitle" className="text-sm text-black">
                Edit title
              </label>
            <textarea
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-black placeholder-violet-300 focus:outline-0"
              onChange={(e) => {
                setText(e.target.value);
              }}
              autoFocus
              value={text}
            />
            <label htmlFor="editdescription" className="text-sm text-black">
                Edit description
              </label>
            <textarea
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-black placeholder-violet-300 focus:outline-0"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              autoFocus
              value={descriptionnow}
            />
            <div className="flex items-center gap-1.5">
           
              <label htmlFor="priority" className="text-sm text-black">
                Edit Priority
              </label>
              <Select value={priority} onValueChange={(value)=>setPriority(value)}>
                <SelectTrigger className="w-[150px] text-black">
                  <SelectValue placeholder="Select Priority" className="text-black"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                   
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

<section className="flex justify-between mt-2">
          
          {!isEdit && (
          <>
            <button onClick={handleDelete} className="text-base text-[#606060]">Delete</button>
            <button onClick={() => setIsEdit(true)} className="text-base text-[#606060]">Edit</button>
          </>
          )}
          {isEdit && (
           <>
            <button onClick={() => setIsEdit(false)} className="text-base text-[#606060]">Cancel</button>
            <button onClick={handleSave} className="text-base text-[#606060]">Save</button>
           </>
          )}
        </section>
      </motion.div>
    </>
  );
};
