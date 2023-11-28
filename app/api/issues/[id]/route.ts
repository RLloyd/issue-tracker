import { issueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { Issue } from '@prisma/client';
import prisma from "@/prisma/client";

interface Props {
   params: { params: { id: string }}
}

// export async function PATCH(request: NextRequest, { params: {params} }: Props){ //using the Props interface
export async function PATCH(
   request: NextRequest,
   { params }: { params: { id: string }}) { //Props is a concept tie so much with with React. We'll use an inline annotations

   const body = await request.json(); //to read the body of the request

   //validate the body using the "validationSchemas.ts" with the name "createIssueSchema" which we'll re-name to "issueSchema" to be more generic
   const validation = issueSchema.safeParse(body);

   //validation un-successfull
   if(!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

   //otherwise
   const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) }
   });

   //if there's no issue
   if(!issue)
      return NextResponse.json({ error: 'Invalid issue'}, { status: 404 }); //not found error

   //otherwise update the title & description
   const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
         title: body.title,
         description: body.description
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

   const issue = await prisma.issue.findUnique({
   // const issue = await prisma.issue.findFirst({
      where: { id: parseInt(params.id) }
   })

   if(!issue) //if there's no issue
      return NextResponse.json(
         { error: "Invalid Issue"},
         { status: 404 }
      );

   await prisma.issue.delete({ //if issue exist, delete
      where: { id: issue.id }
   });

   return NextResponse.json({});
}