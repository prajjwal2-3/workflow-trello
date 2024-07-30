import { Dispatch, FormEvent, SetStateAction } from "react";
import { ColumnType,CardType } from "./KanbanBoard";
import { motion } from "framer-motion";
import { RootState } from "@/store/store";
import { useState } from "react";
import { addCard } from "@/store/cardslice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { FiPlus } from "react-icons/fi";
import { getSession, useSession } from "next-auth/react";
type AddCardProps = {
    column: ColumnType;
    // setCards: Dispatch<SetStateAction<CardType[]>>;
  };
  
 export  const AddCard = ({ column}: AddCardProps) => {
 const user = useSelector((state: RootState) => state.user);


    const [text, setText] = useState("");
    const [description,setDescription]=useState('');
    const [priority, setPriority] = useState('low');
    const [adding, setAdding] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const selectCards = (state: RootState) => state.cards;
    const cards = useSelector(selectCards);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
    
    
      if (!text.trim().length) return;
  
      const newCard = {
        timeAdded: new Date().toISOString(),
        priority: priority as  "Low" | "Medium" | "Urgent",
        column,
       description,
        title: text.trim(),
        user:user.user?._id
        // id: Math.random().toString(36),
        // index: newIndex
      };
  
      dispatch(addCard(newCard));
      setAdding(false);
      setText("");
      setPriority('low');
    };
  
    return (
      <>
        {adding ? (
          <motion.form layout onSubmit={handleSubmit}>
            <textarea
              onChange={(e) => setText(e.target.value)}
              autoFocus
              placeholder="Add new task..."
              className="w-full rounded border border-violet-400 bg-[#2F2188]/30 p-3 text-sm text-black placeholder-black/80 focus:outline-0"
            />
             <textarea
              onChange={(e) => setDescription(e.target.value)}
              autoFocus
              placeholder="Add new task..."
              className="w-full rounded border border-violet-400 bg-[#2F2188]/30 p-3 text-sm text-black placeholder-black/80 focus:outline-0"
            />
            <div className="flex items-center gap-1.5">
              <label htmlFor="priority" className="text-sm text-black/80">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="rounded bg-[#2F2188] px-2 py-1 text-xs text-white"
              >
                <option value="Low" >Low</option>
                <option value="Medium" >Medium</option>
                <option value="Urgent" >Urgent</option>
              </select>
              </div>
            <div className="mt-1.5 flex items-center justify-end gap-1.5">
              <button
                onClick={() => setAdding(false)}
                className="px-3 py-1.5 text-sm text-neutral-400 transition-colors "
              >
                Close
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-sm text-neutral-950 transition-colors hover:bg-neutral-300"
              >
                <span>Add</span>
                <FiPlus />
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.button
            layout
            onClick={() => setAdding(true)}
            className="flex w-full justify-between items-center bg-gradient-to-b from-[#3A3A3A] to-[#202020] gap-1.5 p-2 rounded-lg h-10 text-sm text-neutral-400 transition-colors hover:text-neutral-50"
          >
            <span>Add card</span>
            <FiPlus size={20}/>
          </motion.button>
        )}
      </>
    );
  };
  