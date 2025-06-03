import { useTaskStore } from './../stores/taskStore';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import type { TTaskStatus } from '../types/taskStatus';
import type { TTaskPriority } from '../types/taskPriority';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type Filter = (by: TTaskPriority | TTaskStatus) => void;

interface EnhancedTableToolbarProps {
  selected: number[];
  numSelected: number;
  filteredBy: TTaskPriority | TTaskStatus | null;
  onUnFilter: () => void;
  filter: Filter;
  clearSelected: () => void;
  setFilteredBy: (by: TTaskPriority | TTaskStatus | null) => void;
}

export default function EnhancedTableToolbar({ selected, numSelected, filteredBy, clearSelected, filter, onUnFilter, setFilteredBy }: EnhancedTableToolbarProps) {
  const tasksLength = useTaskStore((state) => state.tasks.length);
  const deleteTasks = useTaskStore(
    (state) => numSelected !== tasksLength ? state.deleteByIds : state.deleteAll
  );

  const handleDelete = () => {
    deleteTasks(selected);
    clearSelected();
  };

  const handleFilter = (by: TTaskPriority | TTaskStatus) => {
    onUnFilter();
    setFilteredBy(by);
    filter(by);
  };

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Tasks
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel htmlFor="grouped-select">Filter</InputLabel>
        <Select defaultValue="" value={filteredBy || ""} id="grouped-select" label="Filter" size="small">
          <MenuItem value="" onClick={onUnFilter}>
            <em>Clear filter</em>
          </MenuItem>
          <ListSubheader>Current status</ListSubheader>
          <MenuItem value={'LOW'} onClick={() => handleFilter('LOW')}>Low</MenuItem>
          <MenuItem value={'MEDIUM'} onClick={() => handleFilter('MEDIUM')}>Medium</MenuItem>
          <MenuItem value={'HIGH'} onClick={() => handleFilter('HIGH')}>High</MenuItem>
          <ListSubheader>Current priority</ListSubheader>
          <MenuItem value={'PENDING'} onClick={() => handleFilter('PENDING')}>Pending</MenuItem>
          <MenuItem value={'IN_PROGRESS'} onClick={() => handleFilter('IN_PROGRESS')}>In progress</MenuItem>
          <MenuItem value={'COMPLETED'} onClick={() => handleFilter('COMPLETED')}>Completed</MenuItem>
        </Select>
      </FormControl>
      </>
      )}
    </Toolbar>
  );
}