import { defaultUpdateSiteFields as defaultFields } from "@/constants/sites/update-site-fields";
import { UpdateSiteData } from "@/types/sites/update-site-data.d";
import TextField from "@mui/material/TextField";
import { memo } from "react";

interface UpdateSiteFormProps {
  data: UpdateSiteData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function UpdateSiteForm({ data, onChange }: UpdateSiteFormProps) {
  return (
    <form className="flex flex-col w-full gap-3">
      {defaultFields.map(({ label, name, type, required, info, disabled }) => {
        const fdValue = data[name as keyof UpdateSiteData] ?? "";

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
export default memo(UpdateSiteForm);
