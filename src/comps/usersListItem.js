import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import useThunk from "../hooks/useThunks";
import ExpandablePanel from "./expandablePanel";

export default function UsersListItem({ user }) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    doRemoveUser(user);
  };

  const header = <>
  <Button className="mr-3" loading={isLoading} onClick={handleClick}>
          <GoTrashcan />
        </Button>
        {error && <div> error deleting user...</div>}
        {user.name}
  </>

  return (
    <ExpandablePanel header={header}>
      CONTENT!!!
    </ExpandablePanel>
  );
}
