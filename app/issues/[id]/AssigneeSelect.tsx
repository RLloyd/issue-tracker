"use client";

import { Skeleton } from '@/app/components';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AssigneeSelect = () => {
   // using tanStack reactQuery useQuery hook
   const { data: users, error, isLoading } = useQuery<User[]>({
      queryKey: ['users'],
      queryFn: () => axios.get('/api/users').then(res => res.data), //this return a Promise that resolved to data
      staleTime: 60 * 1000, //useQuery re-fetch timer
      retry: 3 // useQuery retry fetching 3 times
   });
   if(isLoading) {
      return (
         <Skeleton />
      )
   };
   //if(isLoading) return <Skeleton /> //single line

   if(error) return null;

   // useQuery will replace the ff:
   // const [users, setUsers] = useState<User[]>([]); //type of our users, Prisma User
   // useEffect(() =>  { // useEffect hook to call the backend (callback). for more details using Hooks checkout React course, calling backends
   //    const fetchUsers = async () => {
   //       const {data} = await axios.get<User[]>('/api/users');
   //       setUsers(data);
   //    }
   //    fetchUsers();
   // }, [])

  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
         {/* Group 1 */}
         <Select.Group>
            <Select.Label>Suggestions</Select.Label>

            {users?.map(user => ( //use optional chaining 'coz initially 'users' is undefined until data is fetched from the backend
               <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
            ))}

            <Select.Item value='2'>Odee Gonzales</Select.Item>
            <Select.Item value='3'>John Gonzales</Select.Item>
         </Select.Group>
         {/* Group 2 */}
         <Select.Group>
            <Select.Label>Group 2 Selections</Select.Label>
            <Select.Item value='g2a'>Rolando Gonzales</Select.Item>
            <Select.Item value='g2b'>Odee Gonzales</Select.Item>
            <Select.Item value='g2c'>John Gonzales</Select.Item>
         </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect