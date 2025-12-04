import { defaultNewUserFields as defaultFields } from "@/constants/users/fields/new-user-fields";
import { CreateUserData } from "@/types/users/create-user-data.d";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface AddUserFormProps {
  data: CreateUserData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  genPassword: () => void;
}

export default function AddUserForm({
  data,
  onChange,
  genPassword,
}: AddUserFormProps) {
  return (
    <form className="flex flex-col w-full gap-3">
      {defaultFields.map(({ label, name, type, info }) => {
        const fdValue = data[name as keyof CreateUserData] || "";

        return (
          <div key={name} className="flex flex-col w-full">
            {name === "password" ? (
              <div className="flex w-full items-start gap-4">
                <TextField
                  helperText={info}
                  required
                  label={label}
                  type={type}
                  name={name}
                  value={fdValue}
                  onChange={onChange}
                />

                <Button
                  size="small"
                  startIcon={<i className="bi bi-stars"></i>}
                  onClick={genPassword}
                  className="mt-3!"
                >
                  Generate
                </Button>
              </div>
            ) : (
              <TextField
                helperText={info}
                required
                fullWidth
                label={label}
                type={type}
                name={name}
                value={fdValue}
                onChange={onChange}
              />
            )}
          </div>
        );
      })}
    </form>
  );
}
