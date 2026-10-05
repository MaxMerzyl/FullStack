import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  Typography,
  Box,
  Stack,
  TextField,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Alert,
} from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import {
  mockMedicines,
  getExpiringSoon,
  daysUntilExpiry,
} from '../shared/types/medicine';

const RANGES = [30, 60, 90];

export default function DonationListPage() {
  const [days, setDays] = useState(60);

  const items = useMemo(() => getExpiringSoon(mockMedicines, days), [days]);

  return (
    <Box>
      <Stack direction="row" alignItems="center" gap={1} mb={2}>
        <VolunteerActivismIcon color="primary" fontSize="large" />
        <Typography variant="h4">Отдать до срока</Typography>
      </Stack>

      <Typography color="text.secondary" mb={3}>
        Лекарства, срок годности которых истекает в ближайшее время. Их можно
        передать в приют — там они ещё успеют пригодиться.
      </Typography>

      <TextField
        select
        label="Горизонт, дней"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        sx={{ minWidth: 200, mb: 3 }}
      >
        {RANGES.map((r) => (
          <MenuItem key={r} value={r}>
            {r} дней
          </MenuItem>
        ))}
      </TextField>

      {items.length === 0 ? (
        <Alert severity="info">
          Нет лекарств, которые скоро истекают в выбранном диапазоне.
        </Alert>
      ) : (
        <Stack spacing={2}>
          {items.map((m) => {
            const d = daysUntilExpiry(m.expiryDate);
            return (
              <Card key={m.id} variant="outlined">
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={1}
                  >
                    <Box>
                      <Typography variant="h6">{m.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {m.dosage} · {m.form} ·{' '}
                        {m.inStock > 0
                          ? `в наличии ${m.inStock} ед. (емкость упаковки ${m.packQuantity})`
                          : 'в наличии нет'}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      {m.inStock === 0 && (
                        <Chip size="small" color="error" label="нет в наличии" />
                      )}
                      <Chip
                        color={d <= 30 ? 'warning' : 'default'}
                        label={`истекает через ${d} дн.`}
                      />
                    </Stack>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to="/shelter">
                    Контакты приюта
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}