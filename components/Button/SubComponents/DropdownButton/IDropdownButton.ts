export interface IDropdownButton {
  label: string;
  options?: string[];
  children?: React.ReactNode;
  className?: string;
  setTopic?: React.Dispatch<React.SetStateAction<string>>; // Add this line
}
