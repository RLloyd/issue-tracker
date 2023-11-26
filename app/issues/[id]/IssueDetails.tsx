import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Heading, Flex, Card, Text } from '@radix-ui/themes';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const IssueDetails = ({issue}: {issue: Issue}) => {
  return (
   <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="2" my="2"> {/* gap: space between & my: margin vertical = both Radix props or keys */}
         <IssueStatusBadge status={issue.status} />
         <Text>{ issue.createdAt.toDateString() }</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4"> {/* add Tailwind "prose" & Radix mt:top margin */}
         <ReactMarkdown>{ issue.description }</ReactMarkdown>
      </Card>
   </div>
  )
}

export default IssueDetails