import { Box } from '@radix-ui/themes';
import { Skeleton } from "@/app/components";

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