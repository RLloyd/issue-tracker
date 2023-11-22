import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Heading, Flex, Card, Box } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingIssueDetailPage = () => {
   return (
      <Box className="max-w-xl">
         <Skeleton />
         <Flex gap="2" my="2"> {/* gap: space between & my: margin vertical = both Radix props or keys */}
            <Skeleton width="5rem" />
            <Skeleton width="8rem" />
         </Flex>
         <Card className="prose" mt="4"> {/* add Tailwind "prose" & Radix mt:top margin */}
            <Skeleton count={3} />
         </Card>
      </Box>
  )
}

export default LoadingIssueDetailPage