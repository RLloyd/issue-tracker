import Spinner from '@/app/components/Spinner'
import { Box, Button } from '@radix-ui/themes'
import React from 'react'
import { SiPivotaltracker } from 'react-icons/si'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingNewIssuePage = () => {

   return (

   <Box className="max-w-xl">

      {/* title */}
      <Skeleton />

      {/* smde description */}
      <Skeleton height="10rem"/>

      {/* submit button */}
      {/* <Button>Submit New Issue</Button> */}

   </Box>
  )
}

export default LoadingNewIssuePage