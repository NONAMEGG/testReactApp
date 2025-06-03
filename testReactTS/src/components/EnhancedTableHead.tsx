import type Task from '../interfaces/task.interface';

import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

import { visuallyHidden } from '@mui/utils';

interface HeadCell {
  disablePadding: boolean;
  id: keyof Task;
  label: string;
  isChip: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    disablePadding: true,
    label: 'Title',
    isChip: false,
  },
  {
    id: 'description',
    disablePadding: false,
    label: 'Description',
    isChip: false,
  },
  {
    id: 'createdAt',
    disablePadding: false,
    label: 'Date Created',
    isChip: true,
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Current Status',
    isChip: true,
  },
  {
    id: 'priority',
    disablePadding: false,
    label: 'Current Priority',
    isChip: true,
  },
];

// export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// type Order = 'asc' | 'desc';


interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } =
    props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all tasks',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.isChip ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}