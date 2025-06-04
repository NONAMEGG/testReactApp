import type { FC } from 'react';
import { TableRow, TableCell, Checkbox, Chip } from '@mui/material';
import type Task from '../interfaces/task.interface';

interface TaskTableRowProps {
    row: Task;
    isItemSelected?: boolean;
    labelId: string;
    handleClick: (event: React.MouseEvent<unknown>, id: number) => void;
    handleCheckBoxClick: (event: React.MouseEvent<unknown>, id: number) => void;
}

const TaskTableRow: FC<TaskTableRowProps> = ({ 
    row, isItemSelected, labelId, handleClick, handleCheckBoxClick
 }) => {
    return (
        <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                            sx={{ cursor: 'pointer' }}
                            onDoubleClick={(event) => handleClick(event, row.id)}
                          >
                            <TableCell padding="checkbox"
                              onClick={(event) => handleCheckBoxClick(event, row.id)}>
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
        
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {
                              row.title && row.title.length > 20 ?
                            row.description.substring(0, 10).concat('...') : row.title
                              }
                            </TableCell>
                            <TableCell align="left">{
                              row.description && row.description.length > 20 ?
                            row.description.substring(0, 30).concat('...') : row.description
                            }</TableCell>
                            <TableCell align="center">{row.createdAt.toLocaleString()}</TableCell>
                            <TableCell align="center">
                              <Chip color={
                                row.status === 'PENDING' ? 'default' :
                                  row.status === 'IN_PROGRESS' ? 'secondary' : 'success'
                              }
                                label={row.status} variant="outlined" />
                            </TableCell>
                            <TableCell align="center">
                              <Chip color={
                                row.priority === 'HIGH' ? 'error' :
                                  row.priority === 'MEDIUM' ? 'warning' : 'primary'
                              }
                                label={row.priority} variant="outlined" />
        
                            </TableCell>
                          </TableRow>
    );
}

export default TaskTableRow;