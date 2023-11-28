import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props {
   issueId: number;
}

const EditIssueButton = ({issueId}: Props) => { //using the interface
// const EditIssueButton = ({issueId}: {issueId: number}) => { // simplifying the Props, interface not needed
   return (
      <Button>
         <Pencil2Icon />
         <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
      </Button>
   )
}

export default EditIssueButton