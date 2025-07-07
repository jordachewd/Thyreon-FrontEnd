export interface SectionField {
  label: string;
  name: string;
  type: string;

  required?: boolean;
  disabled?: boolean;
  info?: string;
  options?: string[];
}
