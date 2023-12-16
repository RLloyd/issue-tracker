

import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { HiPlusCircle } from "react-icons/hi";
import IssueStatusFilter from './IssueStatusFilter';

const IssueAction = () => {
	return (
		// <Flex mb="5" justify="between" className="gdBtn-styl-1">
		<Flex mb="5" justify="between">

         <IssueStatusFilter />

			<Button>
				<HiPlusCircle className="w-5 h-5" />
				<Link href="/issues/new">New Issue </Link>
			</Button>
		</Flex>
	);
};

export default IssueAction;
