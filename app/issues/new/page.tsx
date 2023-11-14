"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Link from "next/link";
import { FaceIcon, ImageIcon, SunIcon } from "@radix-ui/react-icons";
import { SiPivotaltracker } from "react-icons/si";

function MyComponent() {
	return (
		<div>
			<FaceIcon />
			<SunIcon />
			<ImageIcon />
		</div>
	);
}

const NewIssuePage = () => {
	return (
		<div className="max-w-xl space-y-3">
			<TextField.Root>
				<TextField.Slot>
					<FaceIcon height="16" width="16" />
					<SiPivotaltracker className="w-4 h-4" />
				</TextField.Slot>
				<TextField.Input placeholder="Title" />
			</TextField.Root>

			<SimpleMDE className="border" placeholder="Description" />

			<Button className="gdBtn-styl-1">
				<SiPivotaltracker className="w-4 h-4" />
				<Link href="/issues/new">Submit New Issue</Link>
			</Button>
		</div>
	);
};

export default NewIssuePage;
