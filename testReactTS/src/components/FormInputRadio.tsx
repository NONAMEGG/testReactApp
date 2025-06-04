import type { FC } from 'react';

import { Controller } from "react-hook-form";
import { Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { TaskPriority } from "../types/taskPriority";
import { TaskStatus } from "../types/taskStatus";

interface FormInputProps {
    name: string;
    control: any;
    label: string;
    radioPropsKind: typeof TaskPriority |  typeof TaskStatus; 
}

const FormInputRadio: FC<FormInputProps> = ({ name, control, label, radioPropsKind }) => {

    return (
        <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <>
        <FormLabel id="demo-radio-buttons-group-label">{name}</FormLabel>
        <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={onChange}
        value={value || Object.keys(radioPropsKind)[0]}
        
      >
        {
            Object.keys(radioPropsKind).map((key, index) => {
                return <FormControlLabel key={index} value={key} control={<Radio />} label={key.toLowerCase()} />
            })
        }
      </RadioGroup>
      </>
      )}
    />
    );
}

export default FormInputRadio;