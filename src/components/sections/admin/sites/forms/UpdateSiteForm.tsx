import { defaultUpdateSiteFields as defaultFields } from "@/constants/sites/update-site-fields";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import TextField from "@mui/material/TextField";
import { memo } from "react";

interface UpdateSiteFormProps {
  data: Partial<GetSiteData>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function UpdateSiteForm({ data, onChange }: UpdateSiteFormProps) {
  return (
    <form className="flex flex-col w-full gap-3">
      {defaultFields.map(({ label, name, type, required, info, disabled }) => {
        const fdValue = data[name as keyof Partial<GetSiteData>] ?? "";

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
export default memo(UpdateSiteForm);
