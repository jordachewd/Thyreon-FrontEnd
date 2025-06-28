"use client";

import {
  dummyUserFormData,
  dummyUserUpdateData,
} from "@/constants/dummy-user-formdata.const";
import createUser from "@/lib/actions/users/create";
import updateUser from "@/lib/actions/users/update";
import { Button } from "@mui/material";

export default function AddNewUserButton() {
  const createDummyUser = async () => {
    await createUser(dummyUserFormData);
  };

  const updateDummyUser = async () => {
    await updateUser(dummyUserUpdateData);
  };

  return (
    <div className="flex flex-col w-full">
      <Button onClick={createDummyUser} size="small" sx={{ width: 200 }}>
        Add New User
      </Button>
      <Button onClick={updateDummyUser} size="small" sx={{ width: 200 }}>
        Update User
      </Button>
    </div>
  );
}
