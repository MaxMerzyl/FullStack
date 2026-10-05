import { Outlet, Link, useLocation } from 'react-router';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const navItems = [
  { label: 'Аптечка', to: '/' },
  { label: 'Добавить', to: '/add' },
  { label: 'Отдать до срока', to: '/donation' },
  { label: 'Приют', to: '/shelter' },
];

export default function Layout() {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 1, flexWrap: 'wrap' }}>
          <MedicalServicesIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, minWidth: 200 }}>
            Домашняя аптечка онлайн
          </Typography>
          {navItems.map((item) => (
            <Button
              key={item.to}
              color="inherit"
              component={Link}
              to={item.to}
              sx={{
                fontWeight: location.pathname === item.to ? 700 : 400,
                borderBottom: location.pathname === item.to ? '2px solid white' : 'none',
              }}
            >
              {item.label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 4, flexGrow: 1 }} maxWidth="lg">
        <Outlet />
      </Container>

      <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: '#f5f5f5' }}>
        <Typography variant="body2" color="text.secondary">
        </Typography>
      </Box>
    </Box>
  );
}