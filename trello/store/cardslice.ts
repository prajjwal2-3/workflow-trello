import { CardType } from "@/components/KanbanBoard";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BACKEND_URL = process.env.BACKEND_URL;
const API_URL = `https://trello-backend-kkt8.onrender.com/api/cards`;

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (_id: string | undefined) => {
    try {
      const response = await axios.get(`${API_URL}?userID=${_id}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      
      console.error("Error fetching cards:", error);
      throw error;
    }
  }
);

export const addCard = createAsyncThunk(
  "cards/addCard",
  async (card: Partial<CardType>) => {
    try {
      const response = await axios.post(API_URL, card, {
        params: { userID: card.user },
      });
      return response.data;
    } catch (error) {
      
      console.error("Error adding card:", error);
      throw error;
    }
  }
);

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (card: CardType) => {
    try {
      const response = await axios.put(API_URL, card, {
        params: { userID: card.user },
      });
      return response.data;
    } catch (error) {
   
      console.error("Error updating card:", error);
      throw error;
    }
  }
);

export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async ({
    data,
  }: {
    data: {
      id: string;
      user: string | undefined;
    };
  }) => {
    try {
      await axios.delete(API_URL, {
        params: { id: data.id, userID: data.user },
      });
      return data.id;
    } catch (error) {
      
      console.error("Error deleting card:", error);
      throw error;
    }
  }
);

const cardSlice = createSlice({
  name: "cards",
  initialState: [] as CardType[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const index = state.findIndex(
          (card) => card._id === action.payload._id
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
        // reorderCards(state, action.payload.column);
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        return state.filter((card) => card._id !== action.payload);
      });
  },
});
export default cardSlice.reducer;
