import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";

type DebouncInputProps = {
  value: string | number | Date;
  onChange: (value: string | number | Date) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

export const DebouncedInput: FC<DebouncInputProps> = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  // console.log(typeof initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <label>Filtrar por Cliente o Total de Venta :</label>
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Box>
  );
};
