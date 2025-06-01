import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import type { TTaskPriority } from '../types/taskPriority';
import type { TTaskStatus } from '../types/taskStatus';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTaskStore } from './../stores/taskStore';
import FormInputText from './FormInputText';

interface TaskAddPopupProps {
    open: boolean;
    onClose: () => void;
}

type FormInputs = {
    title: string;
    description: string;
    priority: TTaskPriority;
    status: TTaskStatus;
}

export default function TaskAddPopup({ open, onClose }: TaskAddPopupProps) {
    const { control, handleSubmit } = useForm<FormInputs>();

    const createTask = useTaskStore((state) => state.create);
    const getLastId = useTaskStore((state) => state.getLastId);
    const curId : number = getLastId() + 1;

    const onSubmit = (data: FormInputs) => {
        createTask(curId, data.title, data.status,  data.priority, data.description);
        control._reset();
        onClose();
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Add task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add your task
                    </DialogContentText>
        <form>
                <FormInputText name='title' control={control} label={'title'}/>    
                <FormInputText name='description' control={control} label={'description'}/>    
                <FormInputText name='priority' control={control} label={'priority'}/>    
                <FormInputText name='status' control={control} label={'status'}/>    
    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit(onSubmit)}>Add task</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}