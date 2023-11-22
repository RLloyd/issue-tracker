import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
   params: { id: string } //
}

const IssueDetailPage = async ({params }: Props) => {

   // if somebody type a string at the end of the URL
   // displays 404 error instead of the Unhandled Runtime Error message
   // if(typeof params.id !== 'number') notFound(); //not working!?? gives error either way

   const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) }
   });

   // if no issue, load notFound function
   if(!issue)
      notFound();

   // otherwise
  return (
    <div>
      <p>{ issue.title }</p>
      <p>{ issue.description }</p>
      <p>{ issue.status }</p>
      <p>{ issue.createdAt.toDateString() }</p>
    </div>
  )
}

export default IssueDetailPage