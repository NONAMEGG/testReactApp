import type { FC } from 'react';

import { Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import type { Control } from "react-hook-form";
import type { FormInputs } from "../interfaces/formInputs.interface";



interface FormInputProps {
    name: "title" | "description" | "priority" | "status";
    control: Control<FormInputs, any, FormInputs> | undefined;
    label: string;
}


const FormInputText: FC<FormInputProps> = ({ name, control, label }) => {

    return (
        <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        name === 'description' ?
          <TextField
          id="outlined-multiline-static"
          label={label}
          multiline
          rows={8}
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value || ''}
          fullWidth
          
          variant="outlined" /> :
        <TextField sx={{ marginBottom: 2, marginTop: 2 }}
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value || ''}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
    );
}

export default FormInputText;