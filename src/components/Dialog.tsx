import { useState } from "react";

interface IDialog {
  isOpen?: boolean;
  title?: string;
  onSubmit?(formData: any): void;
}
const Dialog = ({ isOpen, title, onSubmit }: IDialog) => {
  const [open, setOpen] = useState(isOpen);
  const [value, setValue] = useState();

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit && onSubmit(value);
    setOpen(false);
  };

  const handleOnChange = (e: React.ChangeEvent) => {
    setValue((prev) => prev);
  };
  return (
    <dialog open={open} className="rounded-sm p-4 z-40 top-4">
      <p>{title || "Insert the filename."}</p>
      <form
        method="dialog"
        className="flex flex-col space-y-2 mt-2"
        onSubmit={handleOnSubmit}
      >
        <input
          name="name"
          type="text"
          autoFocus={true}
          className="border bg-transparent focus:outline-none p-2 m-0"
          onChange={handleOnChange}
        />
        <button className="border" type="submit">
          OK
        </button>
      </form>
    </dialog>
  );
};
export default Dialog;
