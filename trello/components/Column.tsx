import { Dispatch, SetStateAction } from "react";
import { CardType,ColumnType, DropIndicator } from "./KanbanBoard";
import { AppDispatch, RootState } from "@/store/store";
import { updateCard } from "@/store/cardslice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AddCard } from "./AddCard";
import { Card } from "./Card";
import TaskModel from "./dashboard/TaskModel";
type ColumnProps = {
  title: string;
 
  cards: CardType[];
  column: ColumnType;
  // setCards: Dispatch<SetStateAction<CardType[]>>;
};


export const Column = ({
  title,
 
  cards,
  column,

}: ColumnProps) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const handleDragStart = (e: React.DragEvent<Element>, card: CardType) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData("cardId", card._id);
    }
  };
  // const calculateNewIndex = (beforeId: string, cards: CardType[]) => {
  //   if (beforeId === "-1") return cards.length;
  
  //   const beforeCard = cards.find((c) => c._id === beforeId);
  //   return beforeCard ? beforeCard.index : cards.length;
  // };
  const handleDragEnd = (e: DragEvent) => {
    if(!e.dataTransfer) return;
    setActive(false);
    clearHighlights();

    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let cardToTransfer = cards.find((c) => c._id === cardId);
      if (!cardToTransfer) return;
      // const newIndex = calculateNewIndex(before, cards);
      cardToTransfer = { ...cardToTransfer, column };

      const updatedCard = {
        ...cardToTransfer,
        column: column,
        user:user.user?._id
        // index: newIndex
      };

      dispatch(updateCard(updatedCard));
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className=" shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium text-lg text-[#555555]`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
      //  @ts-ignore 
        onDrop={handleDragEnd}
        // @ts-ignore 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-[#F7F7F7] mb-3" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c._id} {...c}  handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <TaskModel column={column}/>
      </div>
    </div>
  );
};
