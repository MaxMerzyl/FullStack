import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  Stack,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  mockMedicines,
  daysUntilExpiry,
  type Medicine,
  type MedicineCategory,
} from '../shared/types/medicine';

export default function MedicineListPage() {
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);
  const [category, setCategory] = useState<'all' | MedicineCategory>('all');
  const [search, setSearch] = useState('');
  const [pendingDelete, setPendingDelete] = useState<Medicine | null>(null);

  const filtered = useMemo(() => {
    return medicines
      .filter((m) => category === 'all' || m.category === category)
      .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => daysUntilExpiry(a.expiryDate) - daysUntilExpiry(b.expiryDate));
  }, [medicines, category, search]);

  const handleConfirmDelete = () => {
    if (!pendingDelete) return;
    setMedicines((prev) => prev.filter((m) => m.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Моя аптечка</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/add"
        >
          Добавить лекарство
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
        <TextField
          label="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value as 'all' | MedicineCategory)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="all">Все</MenuItem>
          <MenuItem value="human">Для людей</MenuItem>
          <MenuItem value="animal">Для животных</MenuItem>
        </TextField>
      </Stack>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Дозировка</TableCell>
              <TableCell>Форма</TableCell>
              <TableCell align="right">Кол-во в упак.</TableCell>
              <TableCell align="right">В наличии</TableCell>
              <TableCell>Срок годности</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((m) => {
              const days = daysUntilExpiry(m.expiryDate);
              const expiryColor = days < 0 ? 'error' : days <= 60 ? 'warning' : 'success';
              return (
                <TableRow key={m.id} hover>
                  <TableCell>{m.name}</TableCell>
                  <TableCell>{m.dosage}</TableCell>
                  <TableCell>{m.form}</TableCell>
                  <TableCell align="right">{m.packQuantity}</TableCell>
                  <TableCell align="right">
                    {m.inStock === 0 ? (
                      <Chip size="small" color="error" label="нет" />
                    ) : (
                      m.inStock
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      color={expiryColor}
                      label={
                        days < 0
                          ? `просрочено (${m.expiryDate})`
                          : `${m.expiryDate} (${days} дн.)`
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {m.category === 'human' ? 'Для людей' : 'Для животных'}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Редактировать">
                      <IconButton
                        size="small"
                        component={Link}
                        to={`/edit/${m.id}`}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setPendingDelete(m)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Ничего не найдено
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Диалог подтверждения удаления */}
      <Dialog open={pendingDelete !== null} onClose={() => setPendingDelete(null)}>
        <DialogTitle>Удалить лекарство?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {pendingDelete &&
              `«${pendingDelete.name}» будет удалено из аптечки. Действие можно отменить только до подтверждения.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPendingDelete(null)}>Отмена</Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete}>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}