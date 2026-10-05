export type MedicineCategory = 'human' | 'animal';

export interface Medicine {
  id: number;
  name: string;
  dosage: string;
  form: string;
  packQuantity: number;
  inStock: number;
  expiryDate: string;
  category: MedicineCategory;
  notes?: string;
}

export const mockMedicines: Medicine[] = [
  {
    id: 1,
    name: 'Парацетамол',
    dosage: '500 мг',
    form: 'таблетки',
    packQuantity: 10,
    inStock: 8,
    expiryDate: '2026-12-01',
    category: 'human',
  },
  {
    id: 2,
    name: 'Активированный уголь',
    dosage: '250 мг',
    form: 'таблетки',
    packQuantity: 20,
    inStock: 17,
    expiryDate: '2026-10-20',
    category: 'human',
  },
  {
    id: 3,
    name: 'Ветом 1.1',
    dosage: '50 г',
    form: 'порошок',
    packQuantity: 2,
    inStock: 1,
    expiryDate: '2026-10-15',
    category: 'animal',
  },
  {
    id: 4,
    name: 'Ибупрофен',
    dosage: '200 мг',
    form: 'таблетки',
    packQuantity: 15,
    inStock: 13,
    expiryDate: '2027-05-10',
    category: 'human',
  },
  {
    id: 5,
    name: 'Капли для глаз "Барс"',
    dosage: '10 мл',
    form: 'капли',
    packQuantity: 1,
    inStock: 1,
    expiryDate: '2026-10-25',
    category: 'animal',
  },
];

export function daysUntilExpiry(expiryDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  const diffMs = expiry.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function getExpiringSoon(medicines: Medicine[], days = 60): Medicine[] {
  return medicines
    .filter((m) => {
      const d = daysUntilExpiry(m.expiryDate);
      return d >= 0 && d <= days;
    })
    .sort((a, b) => daysUntilExpiry(a.expiryDate) - daysUntilExpiry(b.expiryDate));
}