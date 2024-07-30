import { useEffect } from "react";
import { Column } from "./Column";
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../store/store';
import { CardType } from "./KanbanBoard";
import axios from "axios";
import { useSession } from "next-auth/react";
export const Board = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const cards = useSelector((state: RootState) => state.cards);
  


  

  return (
    <div className="grid grid-cols-4 gap-5 h-full w-full  overflow-hidden p-5">
      <Column
        title="To do"
        column="todo"
        cards={cards}
      />
      <Column
        title="In progress"
        column="inprogress"
        cards={cards}
      />
      <Column
        title="Under review"
        column="underreview"
        cards={cards}
      />
      <Column
        title="Finished"
        column="finished"
        cards={cards}
      />
    </div>
  );
};