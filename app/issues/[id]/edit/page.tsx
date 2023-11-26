import React from 'react'
// import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

/*--= Loading the Skeleton loading page =--*/
const IssueForm = dynamic(
   () => import('@/app/issues/_components/IssueForm'),
   {
      ssr: false,
      loading: () => <IssueFormSkeleton />
    }
);

/*--= Interface =--*/
interface Props {
   params: { id: string };
}

/*--= Component =--*/
const EditIssuePage = async ({ params }: Props ) => {
   const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id)}
   });

   if(!issue) notFound();

   return (
      // to use IssueForm we need interface and populate the form using Prisma with the given id
      <IssueForm issue={issue}/>
   )
}

export default EditIssuePage