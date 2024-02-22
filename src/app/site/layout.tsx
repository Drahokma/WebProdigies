import Navigation from '@/components/site/navigation';
import { dark } from '@clerk/themes';
import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';

interface layoutProps {
    children: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({children}) => {
    return (
        <main className='h-full'>
            <ClerkProvider appearance={{baseTheme: dark}}>
                <Navigation />
                {children}
            </ClerkProvider>
        </main>
    );
};

export default layout;