import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";

type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

export const DatePicker: FC<DatePickerProps> = ({
  value: initialValue,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  const handlerChange = () => {
    let newValue = value.split("-").reverse().join("/");

    onChange(newValue);
  };

  useEffect(() => {
    // console.log("Llamandome ");
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    handlerChange();
    setValue((oldValue) => {
      // console.log(oldValue);
      return oldValue.split("/").reverse().join("-");
    });
  }, [value]);

  return (
    <Box display="flex" gap={2} >
      <label>Seleccionar fecha de venta :</label>
      <input
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </Box>
  );
};
