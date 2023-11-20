import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link  from 'next/link';
import prisma from "@/prisma/client";
import { SiPivotaltracker } from "react-icons/si";
import { HiPlusCircle } from "react-icons/hi";

const IssuesPage = async () => {
   const issues = await prisma.issue.findMany(); //find all our issues
	return (
		<div>
         <div className="gdBtn-styl-1 mb-5">
            <Button>
               <HiPlusCircle className="w-5 h-5" />
               <Link href="/issues/new">New Issue </Link>
            </Button>
         </div>


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
                        {issue.title}
                        {/* in mobile: show status in same column as title, but hidden on md */}
                        <div className='block md:hidden'>{issue.status}</div>
                     </Table.Cell>
                     <Table.Cell className="hidden md:table-cell">{issue.status}</Table.Cell>
                     <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table.Root>
		</div>
	);
};

export default IssuesPage;
