import {
  Typography, Box, Paper, Stack, Divider, List, ListItem, ListItemText,
} from '@mui/material';

export default function ShelterInfoPage() {
  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Приют «Верный друг»
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 700 }}>
        <Typography paragraph>
          Мы принимаем лекарства для людей и животных, у которых ещё не истёк
          срок годности. Особенно нужны: антисептики, перевязочные материалы,
          препараты от паразитов и витамины.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>
          <Typography variant="h6">Что мы принимаем</Typography>
          <List dense>
            <ListItem><ListItemText primary="Таблетки и капсулы в закрытой упаковке" /></ListItem>
            <ListItem><ListItemText primary="Капли, мази, растворы" /></ListItem>
            <ListItem><ListItemText primary="Перевязочные материалы" /></ListItem>
            <ListItem><ListItemText primary="Ветпрепараты (по согласованию)" /></ListItem>
          </List>

          <Typography variant="h6" mt={2}>Контакты</Typography>
          <Typography>Адрес: г. Примерск, ул. Добрая, д. 12</Typography>
          <Typography>Телефон: +7 (900) 000-00-00</Typography>
          <Typography>Почта: help@verny-drug.example</Typography>
        </Stack>
      </Paper>
    </Box>
  );
}