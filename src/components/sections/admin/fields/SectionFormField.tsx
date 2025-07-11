import { SectionField } from "@/types/fields/section-field.interface";
import css from "./SectionFormField.module.css";
import { TextField, MenuItem, TextareaAutosize } from "@mui/material";
import { RefObject } from "react";
import Image from "next/image";

interface FormFieldProps<T, E = Record<string, unknown>> {
  field: SectionField;
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  inputRefs: RefObject<{
    [key: string]: HTMLInputElement | HTMLTextAreaElement | null;
  }>;
  restricted?: boolean;
  errors?: E;
}

export default function SectionFormField<T, E = Record<string, unknown>>({
  field,
  formData,
  setFormData,
  inputRefs,
  restricted = false,
  errors,
}: FormFieldProps<T, E>) {
  const isRestricted = restricted || field.disabled;
  const fieldError = errors?.[field.name as keyof E] as
    | { info?: string }
    | undefined;
  const isError = fieldError?.info ?? "";
  const name = field.name as keyof T;

  let inputField;

  switch (field.type) {
    case "select":
      inputField = (
        <div className={css.wrapper}>
          <div className={css.label}>
            <span className={css.labelTitle}>
              {field.label}
              {field.required && <sup>*</sup>}
            </span>
            {field.info && <span className={css.labelInfo}>{field.info}</span>}
          </div>

          {isRestricted && (
            <div className="capitalize text-gray-400 text-sm">
              {String(formData[name] ?? "")}
            </div>
          )}
          {!isRestricted && (
            <TextField
              select
              size="small"
              required={field.required}
              name={field.name}
              disabled={isRestricted}
              className={`${css.field}`}
              value={formData[name]}
              helperText={isError}
              error={Boolean(isError)}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev, [name]: value }));
              }}
              sx={{ textTransform: "capitalize" }}
              inputRef={(el: HTMLInputElement | null) => {
                if (inputRefs.current) {
                  inputRefs.current[field.name] = el;
                }
              }}
            >
              {field.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        </div>
      );
      break;

    case "image":
      inputField = (
        <div className={css.wrapper}>
          <div className={css.label}>
            <span className={css.labelTitle}>
              {field.label}
              {field.required && <sup>*</sup>}
            </span>
            {field.info && <span className={css.labelInfo}>{field.info}</span>}
          </div>
          <div className={`${css.field} flex-col flex`}>
            {String(formData[name]) !== "" &&
            String(formData[name]) !== "null" ? (
              <Image
                src={String(formData[name])}
                alt="User Image"
                width={64}
                height={64}
              />
            ) : (
              <>No Image Yet</>
            )}
          </div>
        </div>
      );

      break;

    case "textarea":
      inputField = (
        <div className={css.wrapper}>
          <div className={css.label}>
            <span className={css.labelTitle}>
              {field.label}
              {field.required && <sup>*</sup>}
            </span>
            {field.info && <span className={css.labelInfo}>{field.info}</span>}
          </div>
          <div className={`${css.field} flex-col flex`}>
            {isRestricted && (
              <div className="text-gray-400 text-sm">
                {String(formData[name] ?? "")}
              </div>
            )}

            {!isRestricted && (
              <TextareaAutosize
                minRows={3}
                name={field.name}
                placeholder={field.label}
                aria-label={field.label}
                required={field.required}
                value={(formData[name] as string) || ""}
                disabled={isRestricted}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [name]: e.target.value }))
                }
                ref={(el: HTMLTextAreaElement | null) => {
                  if (inputRefs.current) {
                    inputRefs.current[field.name] = el;
                  }
                }}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  fontSize: "14px",
                  borderWidth: "1px",
                  borderRadius: "4px",
                  borderColor: isError ? "#dc2626" : "#bfbfbf",
                  background: "transparent",
                }}
              />
            )}
            {isError && <div className={css.fieldError}>{isError}</div>}
          </div>
        </div>
      );
      break;

    default:
      inputField = (
        <div className={css.wrapper}>
          <div className={css.label}>
            <span className={css.labelTitle}>
              {field.label}
              {field.required && <sup>*</sup>}
            </span>
            {field.info && <span className={css.labelInfo}>{field.info}</span>}
          </div>

          {isRestricted && (
            <div className="text-gray-400 text-sm">
              {String(formData[name] ?? "")}
            </div>
          )}
          {!isRestricted && (
            <TextField
              size="small"
              variant="outlined"
              type={field.type}
              name={field.name}
              className={`${css.field}`}
              disabled={isRestricted}
              required={field.required}
              value={(formData[name] as string) || ""}
              helperText={isError}
              error={Boolean(isError)}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [name]: e.target.value }))
              }
              inputRef={(el: HTMLInputElement | null) => {
                if (inputRefs.current) {
                  inputRefs.current[field.name] = el;
                }
              }}
            />
          )}
          {isError && <div className={css.fieldError}>{isError}</div>}
        </div>
      );
  }

  return inputField;
}
