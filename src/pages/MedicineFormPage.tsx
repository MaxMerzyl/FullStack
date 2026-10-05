import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import {
  Typography, Box, TextField, MenuItem, Button, Stack, Paper,
} from '@mui/material';
import { mockMedicines, type MedicineCategory } from '../shared/types/medicine';

export default function MedicineFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = mockMedicines.find((m) => m.id === Number(id));

  const [name, setName] = useState(editing?.name ?? '');
  const [dosage, setDosage] = useState(editing?.dosage ?? '');
  const [form, setForm] = useState(editing?.form ?? '');
  const [packQuantity, setPackQuantity] = useState(editing?.packQuantity ?? 1);
  const [inStock, setInStock] = useState(editing?.inStock ?? 0);
  const [expiryDate, setExpiryDate] = useState(editing?.expiryDate ?? '');
  const [category, setCategory] = useState<MedicineCategory>(editing?.category ?? 'human');
  const [notes, setNotes] = useState(editing?.notes ?? '');

  const [expiryFocused, setExpiryFocused] = useState(false);
  const shrinkExpiryLabel = expiryFocused || expiryDate !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(editing ? 'Изменения сохранены (демо)' : 'Лекарство добавлено (демо)');
    navigate('/');
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        {editing ? 'Редактирование лекарства' : 'Новое лекарство'}
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Название"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Дозировка"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="например, 500 мг"
              fullWidth
            />
            <TextField
              label="Форма выпуска"
              value={form}
              onChange={(e) => setForm(e.target.value)}
              placeholder="таблетки / капли / мазь"
              fullWidth
            />
            <TextField
              label="Емкость упаковки"
              type="number"
              value={packQuantity}
              onChange={(e) => setPackQuantity(Number(e.target.value))}
              inputProps={{ min: 1 }}
              fullWidth
            />
            <TextField
              label="Кол-во"
              type="number"
              value={inStock}
              onChange={(e) => setInStock(Number(e.target.value))}
              inputProps={{ min: 0 }}
              fullWidth
            />

            <TextField
              label="Срок годности"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              onFocus={() => setExpiryFocused(true)}
              onBlur={() => setExpiryFocused(false)}
              slotProps={{ inputLabel: { shrink: shrinkExpiryLabel } }}
              sx={{
                '& input[type="date"]::-webkit-datetime-edit': {
                  color: shrinkExpiryLabel ? 'inherit' : 'transparent',
                },
              }}
              required
              fullWidth
            />

            <TextField
              select
              label="Категория"
              value={category}
              onChange={(e) => setCategory(e.target.value as MedicineCategory)}
              fullWidth
            >
              <MenuItem value="human">Для людей</MenuItem>
              <MenuItem value="animal">Для животных</MenuItem>
            </TextField>

            <TextField
              label="Заметки"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />

            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained">
                {editing ? 'Сохранить' : 'Добавить'}
              </Button>
              <Button component={Link} to="/" variant="outlined">
                Отмена
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}