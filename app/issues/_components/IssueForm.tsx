"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic"; //first import dynamic
// import SimpleMDE from "react-simplemde-editor"; //instead of importing this here
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaceIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import axios from "axios";
import delay from "delay";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SiPivotaltracker } from "react-icons/si";
import { z } from "zod";
import "./../gd-issues-style.css";
import { Issue } from "@prisma/client";

// function MyComponent() {
// 	return (
// 		<div>
// 			<FaceIcon />
// 			<SunIcon />
// 			<ImageIcon />
// 		</div>
// 	);
// }

/*-- Redundant after creating validationSchemas.ts based on this interface
interface IssueForm {
   title: string,
   description: string
} --*/

// use dynamic here to lazy load the smde component
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
	issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
// const IssueForm = ({ issue }: { issue?: Issue }) => {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueFormData>({
		resolver: zodResolver(issueSchema),
	});
	// console.log("registered: ", register('title'));

	const [error, setError] = useState("");
	// console.log("error:", error);

	const [isSubmitting, setSubmitting] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		try {
			setSubmitting(true);

         // patching or updating issue
         if (issue)
            await axios.patch('/api/issues/' + issue.id, data);
         else

         // post request to the backend
			await axios.post("/api/issues", data);
			router.push("/issues");

		} catch (error) {
			// console.log("error: ", error);
			setSubmitting(false);
			setError("An unecpected error occured.xxxx");
		}

		// await delay(4000);
	});

	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root color="red" className="mb-5">
					<Callout.Icon>
						<InfoCircledIcon width="22" height="22" />
					</Callout.Icon>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className="gd-issues space-y-3" onSubmit={onSubmit}>
				<TextField.Root>
					{/* icon */}
					<TextField.Slot>
						<FaceIcon height="16" width="16" />
						<SiPivotaltracker className="w-4 h-4" />
					</TextField.Slot>

					{/* title */}
					<TextField.Input defaultValue={issue?.title} placeholder="Title" {...register("title")} />
				</TextField.Root>

				{/* Title TextField error */}

				<ErrorMessage>{errors.title?.message}</ErrorMessage>

				{/* smde description */}
				<Controller
					name="description"
					control={control}
					defaultValue={issue?.description}
					render={({ field }) => (
                  <SimpleMDE placeholder="Description" {...field} />
               )}
					// render={({ field }) => <SimpleMDE className="gd-smde border min-h-[50%]" placeholder="Description" {...field} /> }
				/>

				{/* Description TextField error */}
				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				{/* submit button */}
				<Button className="gdBtn-styl-1" disabled={isSubmitting}>
					<SiPivotaltracker className="w-4 h-4" />

					{/* add dynamic button name */}
               { issue ? 'Update Issue' : 'Submit New Issue'}{' '}
               {isSubmitting && <Spinner />}

				</Button>

			</form>
		</div>
	);
};

export default IssueForm;
