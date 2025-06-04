import { useState, useEffect, useMemo } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import { useTaskStore } from '../stores/taskStore';
import type Task from '../interfaces/task.interface';
import TaskAddPopup from '../components/TaskAddPopup';
import EnhancedTableToolbar from '../components/EnhancedTableToolbar';
import EnhancedTableHead from '../components/EnhancedTableHead';
import {TaskPriority} from '../types/taskPriority';
import {TaskStatus} from '../types/taskStatus';
import type { TTaskPriority } from '../types/taskPriority';
import type { TTaskStatus } from '../types/taskStatus';

import {
   Fab, Chip, Box, Table, TableBody, TableCell, TableContainer,
   TablePagination, TableRow, Paper, Tooltip, Checkbox
 } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


type Filter = (by: TTaskPriority | TTaskStatus) => void;

const Home = () => {
  // const [orderBy, setOrderBy] = useState<keyof Task>('createdAt');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  // const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [filteredRows, setFilteredRows] = useState<Task[]>([]);
  const [filteredBy, setFilteredBy] = useState<TTaskPriority | TTaskStatus | null>(null); 
  const rows: Task[] = useTaskStore((state) => state.tasks);

  const [open, setOpen] = useState<boolean>(false);
  const [curId, setCurId] = useState<number | null>(null);
  
  const filter : Filter = (by) => {
    let filteredTasks: Task[] = [];
    if (Object.values(TaskPriority).includes(by as TTaskPriority)) {
      filteredTasks = rows.filter((task) => task.priority === by);
    } else if (Object.values(TaskStatus).includes(by as TTaskStatus)) {
      filteredTasks = rows.filter((task) => task.status === by);
    }
    setFilteredRows(filteredTasks);
  }

  useEffect(() => {
    if (filteredBy) {
      filter(filteredBy as TTaskPriority | TTaskStatus);
    }
  } 
  , [rows]);

  const onUnFilter = () => setFilteredBy(null);

  const handleClickOpen = () => {
    setOpen(true);
  };


  const onClose = () => {
    setOpen(false);
    setCurId(null);
  }

  const clearSelected = () => {
    setSelected([]);
  }

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleCheckBoxClick = (event: MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleClick = (event: MouseEvent<unknown>, id: number) => {
    setCurId(id);
    setOpen(true);
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () => {
      if (filteredBy) {
        return [...filteredRows]
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      } else {
        return [...rows]
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      }

    },
    [page, rowsPerPage, rows, filteredBy, filteredRows]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          selected={selected} numSelected={selected.length} clearSelected={clearSelected}
          filter={filter} onUnFilter={onUnFilter} filteredBy={filteredBy} setFilteredBy={setFilteredBy}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

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
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TaskAddPopup open={open} onClose={onClose} taskCurId={curId} />
        <Tooltip title="Add Task">
          <Fab sx={{ my: -2 }}
           onClick={handleClickOpen} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Tooltip>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default Home;