'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { GoTrash } from "react-icons/go";

interface Props {
   issueId: number;
}

const DeleteIssueButton = ( {issueId}: Props ) => {
  return (
   <AlertDialog.Root>

      {/* Button trigger */}
      <AlertDialog.Trigger>
         <Button color='red'>
            <GoTrash />Delete Issue
         </Button>
      </AlertDialog.Trigger>

      {/* text inside content */}
      <AlertDialog.Content>
         <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
         <AlertDialog.Description>Are you sure you want to delete this issue? This action cannot be undone.</AlertDialog.Description>

         {/* Dialog buttons */}
         <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
               <Button variant='soft' color='gray'>Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
               <Button color='red'>Delete</Button>
            </AlertDialog.Action>
         </Flex>

      </AlertDialog.Content>

   </AlertDialog.Root>
  )
}

export default DeleteIssueButton