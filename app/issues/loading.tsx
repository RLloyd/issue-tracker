import { Skeleton } from "@/app/components";
import { Table } from "@radix-ui/themes";
import IssueAction from "./IssueAction";

const LoadingIssuesPage = () => {
	const issues = [1, 2, 3, 4, 5]; //renders 5 rows of skeleton

	return (
		<div>
			<IssueAction />
			{/*--= Skeleton structure for app/issues/page.tsx only! =--*/}
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
					{issues.map((issue) => (
						<Table.Row key={issue}>
							<Table.Cell>
								<Skeleton />
								{/* in mobile: show status in same column as title, but hidden on md */}
								<div className="block md:hidden">
									<Skeleton />
								</div>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<Skeleton />
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<Skeleton />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export default LoadingIssuesPage;
