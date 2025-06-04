import type { FC } from 'react';

import { Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';

interface FormInputProps {
    name: string;
    control: any;
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