import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setCookie, parseCookies } from 'nookies'; 

interface User {
    email: string;
    username: string;
    _id: string;
}

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

const cookies = parseCookies();
const savedState: UserState = cookies.userState ? JSON.parse(cookies.userState) : initialState;

const userSlice = createSlice({
    name: 'user',
    initialState: savedState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            
            setCookie(null, 'userState', JSON.stringify(state), {
                maxAge: 30 * 24 * 60 * 60, 
                path: '/', 
            });
        },
        clearUser: (state) => {
            state.user = null;
          
            setCookie(null, 'userState', JSON.stringify(state), {
                maxAge: 30 * 24 * 60 * 60, 
                path: '/', 
            });
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;