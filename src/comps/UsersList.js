import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import { ShimmerTable } from "react-shimmer-effects";
import Button from "./Button";
import useThunk from "../hooks/useThunks";
import UsersListItem from "./usersListItem";

export default function UsersList() {
  const [doFetechUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
  const { data } = useSelector((state) => {
    return state.users;
  });
  useEffect(() => {
    doFetechUsers();
  }, [doFetechUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  if (isLoadingUsers) {
    return (
      <div>
        <ShimmerTable row={10} col={1} />
      </div>
    );
  }

  let content;

  if (loadingUsersError) {
    content = <div>Error Fetching Data...</div>;
  } else if (loadingUsersError) {
    content = <div>Error fetching Data...</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
      
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && "error creating user"}
      </div>
      {content}
    </div>
  );
}
