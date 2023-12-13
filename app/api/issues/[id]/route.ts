import { patchIssueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { Issue } from '@prisma/client';
import prisma from "@/prisma/client";
import delay from "delay";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

interface Props {
   params: { params: { id: string }}
}

// export async function PATCH(request: NextRequest, { params: {params} }: Props){ //using the Props interface
export async function PATCH(
   request: NextRequest,
   { params }: { params: { id: string }}) { // Props is a concept tied so much with with React. We'll use an inline annotations

   const session = await getServerSession(authOptions);
   if(!session) return NextResponse.json({}, {status: 401});

   const body = await request.json(); //to read the body of the request

   // Validate the body using the "validationSchemas.ts" with the name "createIssueSchema" which we'll re-name to "issueSchema" to be more generic
   // Replace "issueSchema" with the new "patchIssueSchema" for the validation with optional property
   const validation = patchIssueSchema.safeParse(body);
   console.log("validation: ", validation);

   //validation un-successfull
   if(!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

   const {assignedToUserId, title, description} = body; // destructured to avoid writing body.assignedToUserId | body.title | body.description

   if (assignedToUserId) {
      const user = await prisma.user.findUnique({ where: { id: assignedToUserId }})
      if (!user)
         return NextResponse.json({ error: "Invalid user."}, {status: 400})
   }

   //otherwise
   const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) }
   });
   console.log("issue: ", issue);

   //if there's no issue
   if(!issue)
      return NextResponse.json({ error: 'Invalid issue'}, { status: 404 }); //not found error

   // otherwise update the title & description & the new assignedToUserId property //
   const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
         title,
         description,
         assignedToUserId
      }
   })

   //return results to the client
   return NextResponse.json(updatedIssue);

}

/*-= Deleting an Issue =-*/
// export async function DELETE(request: NextRequest, { params: {params} }: Props){ //using the Props interface

export async function DELETE(
   request: NextRequest,
   { params }: { params: { id: string }}) {
   const session = await getServerSession(authOptions);
   if(!session)
      return NextResponse.json({}, {status: 401});

   delay(2000); //for testing

   const issue = await prisma.issue.findUnique({
   // const issue = await prisma.issue.findFirst({
      where: { id: parseInt(params.id) }
   })

   // if no issue found
   if(!issue)
      return NextResponse.json(
         { error: "Invalid Issue"},
         { status: 404 }
      );

   // else delete
   await prisma.issue.delete({
      where: { id: issue.id }
   });

   return NextResponse.json({});
}