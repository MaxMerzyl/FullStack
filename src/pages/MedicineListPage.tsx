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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  mockMedicines,
  daysUntilExpiry,
  type MedicineCategory,
} from '../shared/types/medicine';

export default function MedicineListPage() {
  const [category, setCategory] = useState<'all' | MedicineCategory>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return mockMedicines
      .filter((m) => category === 'all' || m.category === category)
      .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => daysUntilExpiry(a.expiryDate) - daysUntilExpiry(b.expiryDate));
  }, [category, search]);

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
              <TableCell align="right">Емкость упаковки</TableCell>
              <TableCell align="right">Кол-во</TableCell>
              <TableCell>Срок годности</TableCell>
              <TableCell>Категория</TableCell>
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
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Ничего не найдено
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}