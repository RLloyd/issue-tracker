import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';

import delay from 'delay';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

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
      <Grid columns={{initial:"1", md:"2"}} gap="5">

         {/* Left child column */}
         <Box>
            <IssueDetails issue={issue} />
         </Box>

         {/* Right child column */}
         <Box>
            <EditIssueButton issueId={issue.id} />
         </Box>

      </Grid>
   )
}

export default IssueDetailPage