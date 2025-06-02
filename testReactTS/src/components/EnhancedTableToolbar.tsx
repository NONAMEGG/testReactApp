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


type Filter = (by: TTaskPriority | TTaskStatus) => void;

interface EnhancedTableToolbarProps {
  selected: number[];
  numSelected: number;
  onUnFilter: () => void;
  filter: Filter;
  clearSelected: () => void;
}

export default function EnhancedTableToolbar({ selected, numSelected, clearSelected, filter, onUnFilter }: EnhancedTableToolbarProps) {
  const tasksLength = useTaskStore((state) => state.tasks.length);
  const deleteTasks = useTaskStore(
    (state) => numSelected !== tasksLength ? state.deleteByIds : state.deleteAll
  );

  const handleDelete = () => {
        deleteTasks(selected);
        clearSelected();
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
        <Tooltip title="Filter list">
          <IconButton onClick={() => filter('LOW')} onDoubleClick={onUnFilter}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}