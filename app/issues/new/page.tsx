"use client";

import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Link from "next/link";
import { FaceIcon, ImageIcon, InfoCircledIcon, SunIcon } from "@radix-ui/react-icons";
import { SiPivotaltracker } from "react-icons/si";
import { useForm, Controller } from "react-hook-form";
import "./../gd-issues-style.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


// function MyComponent() {
// 	return (
// 		<div>
// 			<FaceIcon />
// 			<SunIcon />
// 			<ImageIcon />
// 		</div>
// 	);
// }

interface IssueForm {
   title: string,
   description: string
}

const NewIssuePage = () => {
   const router = useRouter();
   const { register, control, handleSubmit } = useForm<IssueForm> ();
      console.log("registered: ", register('title'));
   const [error, setError] = useState ("");
      console.log("error:", error);

	return (
      <div className="max-w-xl">
         {error && (
         <Callout.Root color="red" className="mb-5">
            <Callout.Icon><InfoCircledIcon width="22" height="22" /></Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
         </Callout.Root>)
      }
         <form
            className="gd-issues space-y-3"
            onSubmit={handleSubmit( async(data) => {
               try {
                  await axios.post("/api/issues", data);
                  router.push("/issues");
               } catch (error) {
                  // console.log(error);
                  setError("An unecpected error occured.");
               }
            })}>

            <TextField.Root>
               {/* icon */}
               <TextField.Slot>
                  <FaceIcon height="16" width="16" />
                  <SiPivotaltracker className="w-4 h-4" />
               </TextField.Slot>

               {/* title */}
               <TextField.Input placeholder="Title" {...register("title")}/>
            </TextField.Root>

            {/* smde description */}
            <Controller
               name="description"
               control={control}
               render={({ field }) => <SimpleMDE placeholder="Description" {...field} /> }
               // render={({ field }) => <SimpleMDE className="gd-smde border min-h-[50%]" placeholder="Description" {...field} /> }
               />

            {/* submit button */}
            <Button className="gdBtn-styl-1">Submit New Issue</Button>
            {/* <Button className="gdBtn-styl-1">
               <SiPivotaltracker className="w-4 h-4" />
               <Link href="/issues/new">Submit New Issue</Link>
            </Button> */}
         </form>
      </div>
	);
};

export default NewIssuePage;
