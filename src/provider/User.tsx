import React, { useEffect, useState } from 'react';
import { useProfileQuery } from '../redux/apiSlices/userSlice';
import { UserContext, type User } from './userContext';

export const UserProvider = ({children}: {children: React.ReactNode})=>{
    const {data: profile} = useProfileQuery(undefined, {
        skip: !localStorage.getItem("accessToken")
    });
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        if(profile){
            setUser(profile?.data as User);
        }
    }, [profile]);


    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}