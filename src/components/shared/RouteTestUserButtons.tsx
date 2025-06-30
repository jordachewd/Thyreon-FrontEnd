"use client";

import {
  dummyOneUserDeleteData,
  dummyUserFormData,
  dummyUserUpdateData,
} from "@/constants/dummy-user-formdata.const";
import createUser from "@/lib/actions/users/create";
import updateUser from "@/lib/actions/users/update";
import { Button } from "@mui/material";
import { useState } from "react";
import AlertMessage, { AlertParams } from "./AlertMessage";
import bulkDelete from "@/lib/actions/delete-bulk.action";

export default function RouteTestUserButtons() {
  const [alert, setAlert] = useState<AlertParams | null>(null);

  const createDummyUser = async () => {
    try {
      const createResp = await createUser(dummyUserFormData);

      if (createResp.error || createResp.status === "error") {
        setAlert({
          title: "Create User Error",
          text: Array.isArray(createResp.message)
            ? createResp.message.join(", ")
            : createResp.message || `Error creating dummy user.`,
          severity: "error",
        });
      } else {
        setAlert({
          title: "Create User SUCCESS",
          text: `${dummyUserFormData.username} successfully created.`,
          severity: "success",
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setAlert({
        title: "Create User Error",
        text: `Error creating dummy user: ${errorMessage}`,
        severity: "error",
      });
    }
  };

  const updateDummyUser = async () => {
    try {
      const updateResp = await updateUser(dummyUserUpdateData);
      if (updateResp.error || updateResp.status === "error") {
        setAlert({
          title: "Create User Error",
          text: Array.isArray(updateResp.message)
            ? updateResp.message.join(", ")
            : updateResp.message || `Error creating dummy user.`,
          severity: "error",
        });
      } else {
        setAlert({
          title: "Create User SUCCESS",
          text: `${dummyUserFormData.username} successfully created.`,
          severity: "success",
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setAlert({
        title: "Create User Error",
        text: `Error creating dummy user: ${errorMessage}`,
        severity: "error",
      });
    }
  };

  const deleteOneDummyUser = async () => {
    try {
      const deleteOneResp = await bulkDelete({
        route: "users",
        items: { users: [dummyOneUserDeleteData] },
      });
      console.log("deleteOneResp", deleteOneResp);

      if (deleteOneResp.error || deleteOneResp.status === "error") {
        setAlert({
          title: "Delete One User Error",
          text: Array.isArray(deleteOneResp.message)
            ? deleteOneResp.message.join(", ")
            : deleteOneResp.message || `Error Delete One dummy user.`,
          severity: "error",
        });
      } else {
        setAlert({
          title: "Delete One User SUCCESS",
          text: `User successfuly deleted.`,
          severity: "success",
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setAlert({
        title: "Delete One User  Error",
        text: `Error creating dummy user: ${errorMessage}`,
        severity: "error",
      });
    }
  };

  return (
    <>
      {alert && <AlertMessage message={alert} />}
      <div className="flex w-full gap-4">
        <Button
          onClick={createDummyUser}
          size="small"
          sx={{ width: 160 }}
          variant="contained"
        >
          Add New User
        </Button>
        <Button
          onClick={updateDummyUser}
          size="small"
          sx={{ width: 160 }}
          variant="contained"
        >
          Update User
        </Button>
        <Button
          onClick={deleteOneDummyUser}
          size="small"
          sx={{ width: 160 }}
          variant="contained"
        >
          Delete One User
        </Button>
      </div>
    </>
  );
}
