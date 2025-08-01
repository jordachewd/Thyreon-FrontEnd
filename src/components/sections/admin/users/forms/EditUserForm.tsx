import { defaultEditUserFields as defaultFields } from "@/constants/users/fields/edit-user-fields";
import { UpdateUserData } from "@/types/users/update-user-data.d";
import TextField from "@mui/material/TextField";
import { memo } from "react";

interface EditUserFormProps {
  data: UpdateUserData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function EditUserForm({ data, onChange }: EditUserFormProps) {
  return (
    <form className="flex flex-col w-full gap-3">
      {defaultFields.map(({ label, name, type, required, info, disabled }) => {
        const fdValue = data[name as keyof UpdateUserData] ?? "";

        return (
          <div key={name} className="flex flex-col w-full">
            <TextField
              helperText={info}
              required={required}
              fullWidth
              label={label}
              type={type}
              name={name}
              value={fdValue}
              disabled={disabled}
              onChange={onChange}
              size="small"
            />
          </div>
        );
      })}
    </form>
  );
}

export default memo(EditUserForm);
