import { render, screen, userEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import App from '../../App';

describe('App', () => {
  it('opens on the task summary with both info cards', async () => {
    await render(<App />);

    expect(screen.getByText('Desain Antarmuka Mobile')).toBeOnTheScreen();
    expect(screen.getByText('Integrasi REST API')).toBeOnTheScreen();
  });

  it('switches to the student directory and back', async () => {
    const user = userEvent.setup();
    await render(<App />);

    await user.press(screen.getByRole('tab', { name: 'Mahasiswa' }));

    expect(screen.getByPlaceholderText('Cari nama mahasiswa...')).toBeOnTheScreen();

    await user.press(screen.getByRole('tab', { name: 'Info' }));

    expect(screen.getByText('Desain Antarmuka Mobile')).toBeOnTheScreen();
  });

  it('shows task details in an alert when a card action is pressed', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();
    await render(<App />);

    await user.press(screen.getAllByRole('button', { name: 'Lihat Detail' })[0]);

    expect(alertSpy).toHaveBeenCalledWith(
      'Detail Tugas',
      expect.stringContaining('Desain Antarmuka Mobile'),
    );

    alertSpy.mockRestore();
  });
});
