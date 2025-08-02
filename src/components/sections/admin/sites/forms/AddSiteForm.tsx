import { CreateSiteData } from "@/types/sites/create-site-data.d";
import { defaultNewSiteFields as defaultFields } from "@/constants/sites/new-site-fields";
import TextField from "@mui/material/TextField";
import { memo } from "react";

interface AddSiteFormProps {
  data: CreateSiteData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AddSiteForm({ data, onChange }: AddSiteFormProps) {
  return (
    <form className="flex flex-col w-full gap-3">
      {defaultFields.map(({ label, name, type, info, required }) => {
        const fdValue = data[name as keyof CreateSiteData] || "";
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
              onChange={onChange}
            />
          </div>
        );
      })}
    </form>
  );
}
export default memo(AddSiteForm);
