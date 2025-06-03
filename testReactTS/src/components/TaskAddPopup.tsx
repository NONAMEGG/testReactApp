import React from 'react';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { TTaskPriority } from '../types/taskPriority';
import type { TTaskStatus } from '../types/taskStatus';
import { TaskPriority } from '../types/taskPriority';
import { TaskStatus } from '../types/taskStatus';
import { useTaskStore } from './../stores/taskStore';
import FormInputText from './FormInputText';
import type Task from '../interfaces/task.interface';
import FormInputRadio from './FormInputRadio';



interface TaskAddPopupProps {
    open: boolean;
    onClose: () => void;
    taskCurId: number | null;
}

interface FormInputs {
    title: string;
    description: string;
    priority: TTaskPriority;
    status: TTaskStatus;
}

export default function TaskAddPopup({ open, onClose, taskCurId }: TaskAddPopupProps) {
    const { control, handleSubmit, setValue } = useForm<FormInputs>();


    const updateTask = useTaskStore((state) => state.updateTask);
    const createTask = useTaskStore((state) => state.create);
    const getLastId = useTaskStore((state) => state.getLastId);
    const curId: number = getLastId() + 1;


    if (taskCurId) {
        const curTask: Task | undefined = useTaskStore.getState().getById(taskCurId);

        if (curTask) {
            setValue('title', curTask.title);
            setValue('description', curTask.description);
            setValue('priority', curTask.priority);
            setValue('status', curTask.status);

        }
    }

    const onCancel = () => {
        control._reset();
        onClose();
    }


    const onSubmit = (data: FormInputs) => {
        if (taskCurId) {
            updateTask(taskCurId, data.description, data.title, data.status, data.priority);
            control._reset();
            onClose();
            return;
        }
        createTask(curId, data.title, data.status, data.priority, data.description);
        onCancel();
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={onCancel}
            >
                <DialogTitle>Add / Update task</DialogTitle>
                <DialogContent>
                    <form>
                        <FormInputText name='title' control={control} label={'title'} />
                        <FormInputText name='description' control={control} label={'description'} />
                        <FormInputRadio name='priority' control={control} 
                        label='priority' radioPropsKind={TaskPriority}/>
                        <FormInputRadio name='status' control={control} 
                        label='status' radioPropsKind={TaskStatus} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit(onSubmit)}>
                        {
                            taskCurId ? <span>Update Task</span> :
                            <span>Add task</span>
                        }
                        </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}