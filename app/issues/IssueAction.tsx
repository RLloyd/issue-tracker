import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { HiPlusCircle } from "react-icons/hi";

const IssueAction = () => {
	return (
		<div className="gdBtn-styl-1 mb-5">
			<Button>
				<HiPlusCircle className="w-5 h-5" />
				<Link href="/issues/new">New Issue </Link>
			</Button>
		</div>
	);
};

export default IssueAction;
