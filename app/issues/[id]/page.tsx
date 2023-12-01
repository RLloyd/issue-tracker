import prisma from '@/prisma/client';
import { Box, Flex, Grid, Heading, Text } from '@radix-ui/themes';

import delay from 'delay';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';


const IssueForm = dynamic(
   () => import('@/app/issues/_components/IssueForm'),
   {
      ssr: false,
      loading: () => <IssueFormSkeleton />
    }
);

interface Props {
   params: { id: string };
}

// const IssueDetailPage = async ({ params }: Props) => {
const IssueDetailPage = async ( { params }: { params: { id: string } } ) => {
   const session = await getServerSession(authOptions);

   const issue = await prisma.issue.findUnique({
      where: {id: parseInt(params.id)}
   });

   // if no issue, load notFound function
   if(!issue) notFound();

   await delay(2000); //for testing only!

   // otherwise
   return (
      <>
         <Heading as='h1' color='teal'>Issue Details</Heading>
         <Grid columns={{initial:"1", sm:"4"}} gap="5" className='gd-testX gd-brdr-red'>

            {/* Column1: Content */}
            <Box className="md:col-span-3">
               <IssueDetails issue={issue} />
            </Box>

            {/* if session is truthy show buttons else hide */}
            { session && (
               // {/* Column2: Buttons(Edit & Delete) */}
               <Box display='block' className='gd-testX gd-brdr-lt-grey'>
                  {/* <Flex direction="column" gap="4"> */}
                  <Flex direction="column" gap="4">
                     <AssigneeSelect />
                     <EditIssueButton issueId={issue.id} />
                     <DeleteIssueButton issueId={issue.id} />
                  </Flex>
               </Box>
            )}

            { !session && (
               <Text>You must be loggedin to edit</Text>
            )}



         </Grid>
      </>
   )
}

export default IssueDetailPage