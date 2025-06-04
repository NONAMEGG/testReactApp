import type { FC } from 'react';

import { useForm } from "react-hook-form";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';

import FormInputText from './FormInputText';
import FormInputRadio from './FormInputRadio';

import type { TTaskPriority } from '../types/taskPriority';
import type { TTaskStatus } from '../types/taskStatus';
import { TaskPriority } from '../types/taskPriority';
import { TaskStatus } from '../types/taskStatus';
import { useTaskStore } from './../stores/taskStore';
import type Task from '../interfaces/task.interface';



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

const TaskAddPopup: FC<TaskAddPopupProps> = ({ open, onClose, taskCurId }) => {
    const { control, handleSubmit, setValue } = useForm<FormInputs>();


    const updateTask = useTaskStore((state) => state.updateTask);
    const createTask = useTaskStore((state) => state.create);

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
            updateTask(taskCurId,
                {
                    description: data.description,
                    title: data.title,
                    status: data.status,
                    priority: data.priority
                }
            );
            control._reset();
            onClose();
            return;
        }
        createTask({
            title: data.title,
            status: data.status,
            priority: data.priority,
            description: data.description
        });
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
                         radioPropsKind={TaskPriority} />
                        <FormInputRadio name='status' control={control}
                         radioPropsKind={TaskStatus} />
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

export default TaskAddPopup;