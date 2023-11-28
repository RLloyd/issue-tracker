import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';
import delay from 'delay';

const IssueForm = dynamic(
   () => import('@/app/issues/_components/IssueForm'),
   {
      ssr: false,
      loading: () => <IssueFormSkeleton />
    }
    );

   //  delay(4000);

const NewIssuePage = () => {
  return (


    <IssueForm />
  )
}

export default NewIssuePage