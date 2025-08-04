import { defaultEditUserFields as defaultFields } from "@/constants/users/fields/edit-user-fields";
import { GetUserData } from "@/types/users/get-user-data.d";
import TextField from "@mui/material/TextField";
import { memo } from "react";

interface EditUserFormProps {
  data: Partial<GetUserData>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function EditUserForm({ data, onChange }: EditUserFormProps) {
  return (
    <form className="flex flex-col w-full gap-3">
      {defaultFields.map(({ label, name, type, required, info, disabled }) => {
        const fdValue = data[name as keyof Partial<GetUserData>] ?? "";

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
            />
          </div>
        );
      })}
    </form>
  );
}

export default memo(EditUserForm);
