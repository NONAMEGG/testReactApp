import { Controller } from "react-hook-form";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TaskPriority } from "../types/taskPriority";
import { TaskStatus } from "../types/taskStatus";
import FormLabel from '@mui/material/FormLabel';

interface FormInputProps {
    name: string;
    control: any;
    label: string;
    radioPropsKind: typeof TaskPriority |  typeof TaskStatus; 
}

export default function FormInputRadio({name, control, label, radioPropsKind}: FormInputProps) {

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