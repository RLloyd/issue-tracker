"use client";

import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AssigneeSelect = () => {
   const [users, setUsers] = useState<User[]>([]); //type of our users, Prisma User
   useEffect(() =>  { // useEffect hook to call the backend (callback). for more details using Hooks checkout React course, calling backends
      const fetchUsers = async () => {
         const {data} = await axios.get<User[]>('/api/users');
         setUsers(data);
      }
      fetchUsers();
   }, [])

  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
         {/* Group 1 */}
         <Select.Group>
            <Select.Label>Suggestions</Select.Label>

            {users.map(user => (
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