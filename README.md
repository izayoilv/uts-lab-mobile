# UTS Lab. Pemograman Mobile

Midterm practical exam app built with React Native (Expo) and TypeScript. It
contains both exam questions in one app with a small tab switcher:

- **Info** — two reusable `InfoCard` components with typed props, conditional
  status badges (green for `selesai`, orange for `proses`), and a
  "Lihat Detail" action that opens a native alert.
- **Mahasiswa** — a directory of eight static students with a controlled
  search field, case-insensitive real-time filtering, and an empty state.

## Stack

| Tool | Version |
| --- | --- |
| Expo SDK | 58.0.19 |
| React Native | 0.88.0 |
| React | 19.3.0 |
| TypeScript | 6.0.3 (strict) |
| pnpm | 12.6.0 |
| Jest / jest-expo | 30.5.2 / 58.0.12 |
| React Native Testing Library | 14.1.0 |

## Getting started

Requirements: Node.js 26, pnpm 12, and Expo Go with SDK 58 support.

```bash
pnpm install
pnpm start        # scan the QR code with Expo Go
```

If the phone cannot reach Metro over Wi-Fi, tunnel it over ADB:

```bash
adb reverse tcp:8081 tcp:8081
# then open exp://127.0.0.1:8081 in Expo Go
```

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm start` | Start the Expo dev server |
| `pnpm android` | Start and open on a connected Android device |
| `pnpm test` | Run the 15 Jest tests |
| `pnpm typecheck` | Run `tsc --noEmit` |

## Structure

```text
App.tsx                    Entry screen, tab switcher, task data
src/
  components/InfoCard.tsx  Reusable card component (Question 1)
  screens/DirectoryScreen.tsx
  data/mahasiswa.ts        Static dataset (Question 2)
  utils/filterStudents.ts  Case-insensitive filter logic
  types.ts                 TaskStatus and Student types
  theme.ts                 Colors, spacing, radii
  **/__tests__/            Unit and integration tests
```

## Author

Vincent Yongky Pratama — 2532039 — Teknologi Informasi,
Universitas Internasional Batam.
