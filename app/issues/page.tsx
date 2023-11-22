import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import delay from "delay";
import { Link, IssueStatusBadge } from "@/app/components";
import IssueAction from "./IssueAction";

const IssuesPage = async () => {
   const issues = await prisma.issue.findMany(); //find all our issues
	await delay(2000);

   return (
		<div>
         {/* Move this code to its own component */}
         {/* <div className="gdBtn-styl-1 mb-5">
            <Button>
               <HiPlusCircle className="w-5 h-5" />
               <Link href="/issues/new">New Issue </Link>
            </Button>
         </div> */}
         <IssueAction />


         {/* Table container from RadixUI */}
         <Table.Root variant="surface">
            {/* Table Header */}
            <Table.Header>
               <Table.Row>
                  <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell> {/* hide this header below md */}
                  <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell> {/* hide this header below md */}
               </Table.Row>
            </Table.Header>
            {/* Table Body Section */}
            <Table.Body>
               {issues.map(issue => (

                  <Table.Row key={issue.id}>

                     <Table.Cell>
                        {/* Styled Link */}
                        <Link href={`/issues/${issue.id}`}>
                           {issue.title}
                        </Link>
                        {/* in mobile: show status in same column as title, but hidden on md */}
                        <div className='block md:hidden'><IssueStatusBadge status={issue.status} /></div>
                     </Table.Cell>
                     <Table.Cell className="hidden md:table-cell"><IssueStatusBadge status={issue.status} /></Table.Cell>
                     <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>

                  </Table.Row>

               ))}
            </Table.Body>
         </Table.Root>
		</div>
	);
};

export default IssuesPage;
