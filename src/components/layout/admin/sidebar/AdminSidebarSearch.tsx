"use client";
import { memo } from "react";
import TextField from "@mui/material/TextField";
import css from "@/styles/layout/admin/AdminSidebar.module.css";

const AdminSidebarSearch = memo(() => {
  return (
    <div className={css.search}>
      <TextField
        id="standard-basic"
        label="Search ..."
        size="small"
        sx={{
          width: "100%",
        }}
      />
    </div>
  );
});

AdminSidebarSearch.displayName = "AdminSidebarSearch";
export default AdminSidebarSearch;
