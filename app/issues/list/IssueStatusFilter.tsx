'use client';

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const statuses: { label: string, value?: Status }[] = [
   { label: 'All' },       // w/o value, the value prop is optional
   { label: 'Open',        value: 'OPEN' },
   { label: 'In Progress', value: 'IN_PROGRESS' },
   { label: 'Closed',      value: 'CLOSED' },
];

const IssueStatusFilter = () => {

  return (
    <Select.Root>
      <Select.Trigger placeholder='Filter by status...' />
         <Select.Content>
            {statuses.map(status => (
               // <Select.Item key={status.value} value={status.value || ''}> //error empty string
               <Select.Item key={status.value} value={status.value || 'null'}>
                  {status.label}
               </Select.Item>
                  // console.log("status: ", status);
            ))}
         </Select.Content>

         {/* copied from AssigneeSelect dropdown
         <Select.Content>
            <Select.Group>
               <Select.Label>Suggestions</Select.Label>
               <Select.Item value="null">Unassigned</Select.Item>
               {statuses.map((status) => (
                  <Select.Item key={status.value} value={status.value || ""}>{status.label}</Select.Item>
               ))}
            </Select.Group>
         </Select.Content> */}

    </Select.Root>
  )
}

export default IssueStatusFilter