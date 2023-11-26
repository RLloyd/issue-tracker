import { Box, Button } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components'; //custom skeleton component
import { SiPivotaltracker } from 'react-icons/si'

const IssueFormSkeleton = () => {
  return (
   <Box className="max-w-xl space-y-3">
      LOADING PAGE...
      {/* title */}
      <Skeleton height="2rem"/>
      {/* smde description */}
      <Skeleton height="8rem" className="mt-3"/>
      {/* submit button: only if you want to show the button as part of the skeleton */}
      {/* <Button>
         <SiPivotaltracker className="w-4 h-4" />
         Submit New Issue
      </Button> */}
   </Box>
  )
}

export default IssueFormSkeleton