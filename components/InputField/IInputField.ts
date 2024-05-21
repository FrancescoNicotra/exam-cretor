export interface IInputField {
  label: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  children?: React.ReactNode;
}
