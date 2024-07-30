'use client'
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { Session } from 'next-auth';
// type Provider = ReturnType<typeof Provider>
interface NextAuthSessionProviderProps {
   
    children: React.ReactNode;
    session: Session | null;
  }
  
export function Providers({ children}:NextAuthSessionProviderProps) {
    return (
        <SessionProvider >
            <Provider store={store}>{children}</Provider>
        </SessionProvider>
    );
}
