import prisma from '@/prisma/client'
import { Card, Flex, Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'
import IssueStatusBadge from '../../components/IssueStatusBadge';
import { Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

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
      <Heading>{issue.title}</Heading>
      <Flex gap="2" my="2"> {/* gap: space between & my: margin vertical = both Radix props or keys */}
         <IssueStatusBadge status={issue.status} />
         <Text>{ issue.createdAt.toDateString() }</Text>
      </Flex>
      <Card className="prose" mt="4"> {/* add Tailwind "prose" & Radix mt:top margin */}
         <ReactMarkdown>{ issue.description }</ReactMarkdown>
      </Card>
   </div>
  )
}

export default IssueDetailPage