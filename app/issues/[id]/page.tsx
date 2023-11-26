import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';

import delay from 'delay';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';
import DeleteIssueButton from './DeleteIssueButton';


const IssueForm = dynamic(
   () => import('@/app/issues/_components/IssueForm'),
   {
      ssr: false,
      loading: () => <IssueFormSkeleton />
    }
);

interface Props {
   params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
   const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) }
   });

   // if no issue, load notFound function
   if(!issue)
      notFound();

   await delay(1000); //for testing only!

   // otherwise
   return (
      <Grid columns={{initial:"1", sm:"4"}} gap="5" className='gd-test gd-brdr-red'>
         {/* Content */}
         <Box className="md:col-span-3">
            <IssueDetails issue={issue} />
         </Box>
         {/* Buttons */}
         <Box className='gd-test gd-brdr-lt-grey'>
            <Flex direction="column" gap="4">
               <EditIssueButton issueId={issue.id} />
               <DeleteIssueButton issueId={issue.id} />
            </Flex>
         </Box>
      </Grid>
   )
}

export default IssueDetailPage