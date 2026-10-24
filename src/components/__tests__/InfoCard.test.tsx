import { render, screen, userEvent } from '@testing-library/react-native';
import { InfoCard } from '../InfoCard';

describe('InfoCard', () => {
  it('renders the task title', async () => {
    await render(<InfoCard title="Membuat Laporan" status="proses" onPress={() => {}} />);

    expect(screen.getByText('Membuat Laporan')).toBeOnTheScreen();
  });

  it('labels a completed task as Selesai', async () => {
    await render(<InfoCard title="Riset Pengguna" status="selesai" onPress={() => {}} />);

    expect(screen.getByText('Selesai')).toBeOnTheScreen();
  });

  it('labels an in-progress task as Proses', async () => {
    await render(<InfoCard title="Riset Pengguna" status="proses" onPress={() => {}} />);

    expect(screen.getByText('Proses')).toBeOnTheScreen();
  });

  it('calls onPress when the action button is pressed', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();

    await render(<InfoCard title="Riset Pengguna" status="proses" onPress={onPress} />);
    await user.press(screen.getByRole('button', { name: 'Lihat Detail' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
