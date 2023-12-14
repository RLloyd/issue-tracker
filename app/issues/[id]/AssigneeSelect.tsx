"use client";

import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import toast, { Toaster } from 'react-hot-toast';
import { Toaster, toast } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => { //? destructuring "issue"
   // using tanStack reactQuery useQuery hook
   const { data: users, error, isLoading } = useUsers();

   { isLoading ? <Skeleton /> : null }; //same as below

   // if(isLoading) {
   //    return (
   //       <Skeleton />
   //    )
   // };
   // //if(isLoading) return <Skeleton /> //single line

   // if(error) return null;

   //? useQuery replaces the ff:
   // const [users, setUsers] = useState<User[]>([]); //type of our users, Prisma User
   // useEffect(() =>  { // useEffect hook to call the backend (callback). for more details using Hooks checkout React course, calling backends
   //    const fetchUsers = async () => {
   //       const {data} = await axios.get<User[]>('/api/users');
   //       setUsers(data);
   //    }
   //    fetchUsers();
   // }, [])

   const assignIssue = (userId: string) => {
      axios
         .patch(`/api/issues/${issue.id}`, { assignedToUserId: userId === 'null' ? null : userId })
         .catch(() => {
            toast.error("Changes could not be saved.", {
               duration: 4000,
               // icon: '👏',
               iconTheme: {
                  primary: 'red',
                  secondary: 'white',
                  // background: 'red'
               },
            })
         });
   }

  return (
      <>
         <Select.Root
            defaultValue = {issue.assignedToUserId || "null"}
            onValueChange = {assignIssue}>
         <Select.Trigger placeholder='Assign...' />
         <Select.Content>
            <Select.Group>
               <Select.Label>Suggestions</Select.Label>
               <Select.Item value="null">Unassigned</Select.Item>
               {users?.map((user) => ( //use optional chaining 'coz initially 'users' is undefined until data is fetched from the backend
                  <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
               ))}
            </Select.Group>
         </Select.Content>
         </Select.Root>

         {/* Pop-up message */}
         <Toaster
            containerStyle={{
               top: 100,
               // left: 20,
               // bottom: 20,
               // right: 20,
            }}
            toastOptions={{
               success: {
                  style: {
                     background: 'green',
                  },
               },
               error: {
                  style: {
                     background: 'yellow',
                  },
               },
            }}
         />
      </>
  )
}

// Custom hook
const useUsers = () =>
   useQuery<User[]>({
      queryKey: ['users'],
      queryFn: () => axios.get('/api/users').then(res => res.data), //this return a Promise that resolved to data
      staleTime: 60 * 1000, //useQuery re-fetch timer
      retry: 3 // useQuery retry fetching 3 times
   });

export default AssigneeSelect