import { Button } from '@radix-ui/themes';
import { GoTrash } from "react-icons/go";

interface Props {
   issueId: number;
}

const DeleteIssueButton = ( {issueId}: Props ) => {
  return (
    <Button color='red'>
      {/* <GoTrash className="md:hidden"/> */}
      <GoTrash />
      Delete Issue
   </Button>
  )
}

export default DeleteIssueButton