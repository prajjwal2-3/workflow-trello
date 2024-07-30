"use client";
import React, { useEffect } from "react";
import { Board } from "./Board";
import { useSession } from "next-auth/react";
import axios from "axios";
import { fetchCards } from '../store/cardslice';
import { setUser } from "@/store/userslice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
export const CustomKanban = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userdata = useSelector((state: RootState) => state.user);
  const user = useSession();
  const BACKEND_URL = process.env.BACKEND_URL;

  useEffect(() => {
      dispatch(fetchCards(userdata?.user?._id));
  }, [user]);
  // const user2 = useSelector((state: RootState) => state.user);
 
  return (
    <div className=" w-full bg-white rounded-md  text-neutral-50">
      <Board />
    </div>
  );
};

export type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

export const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

export type ColumnType = 'todo' | 'inprogress' | 'underreview' | 'finished';

export type CardType = {
  priority: 'Urgent' | 'Medium' | 'Low';
  title: string;
  _id: string;
  column: ColumnType;
  timeAdded: string;
  deadline: string;
  description?: string;
  user:string|undefined
};
