import { render, screen, userEvent } from '@testing-library/react-native';
import { DirectoryScreen } from '../DirectoryScreen';

describe('DirectoryScreen', () => {
  it('shows the full student directory before a search', async () => {
    await render(<DirectoryScreen />);

    expect(screen.getByText('Alifia Putri')).toBeOnTheScreen();
    expect(screen.getByText('Budi Santoso')).toBeOnTheScreen();
    expect(screen.getByText('Eka Nur Safitri')).toBeOnTheScreen();
  });

  it('filters students by name without caring about letter casing', async () => {
    const user = userEvent.setup();
    await render(<DirectoryScreen />);

    await user.type(screen.getByPlaceholderText('Cari nama mahasiswa...'), 'ALIFIA');

    expect(screen.getByText('Alifia Putri')).toBeOnTheScreen();
    expect(screen.queryByText('Budi Santoso')).not.toBeOnTheScreen();
  });

  it('shows an empty state when no student matches', async () => {
    const user = userEvent.setup();
    await render(<DirectoryScreen />);

    await user.type(screen.getByPlaceholderText('Cari nama mahasiswa...'), 'zzz');

    expect(screen.getByText('Data tidak ditemukan!')).toBeOnTheScreen();
  });

  it('restores the full directory when the search is cleared', async () => {
    const user = userEvent.setup();
    await render(<DirectoryScreen />);

    await user.type(screen.getByPlaceholderText('Cari nama mahasiswa...'), 'zzz');
    await user.press(screen.getByRole('button', { name: 'Hapus pencarian' }));

    expect(screen.getByText('Budi Santoso')).toBeOnTheScreen();
  });
});
