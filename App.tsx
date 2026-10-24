import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState, type ComponentProps } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { InfoCard } from './src/components/InfoCard';
import { DirectoryScreen } from './src/screens/DirectoryScreen';
import { colors, radius, spacing } from './src/theme';
import type { TaskStatus } from './src/types';

type Tab = 'info' | 'mahasiswa';
type IconName = ComponentProps<typeof Ionicons>['name'];

const TUGAS: { id: string; title: string; status: TaskStatus }[] = [
  { id: '1', title: 'Desain Antarmuka Mobile', status: 'selesai' },
  { id: '2', title: 'Integrasi REST API', status: 'proses' },
];

const TABS: { key: Tab; label: string; icon: IconName; activeIcon: IconName }[] = [
  { key: 'info', label: 'Info', icon: 'document-text-outline', activeIcon: 'document-text' },
  { key: 'mahasiswa', label: 'Mahasiswa', icon: 'people-outline', activeIcon: 'people' },
];

const STATUS_LABEL: Record<TaskStatus, string> = {
  selesai: 'Selesai',
  proses: 'Proses',
};

function showTaskDetail(title: string, status: TaskStatus) {
  Alert.alert('Detail Tugas', `${title}\nStatus: ${STATUS_LABEL[status]}`);
}

export default function App() {
  const [tab, setTab] = useState<Tab>('info');

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <StatusBar style="dark" />

        <View style={styles.topBar}>
          <View style={styles.brand}>
            <View style={styles.brandMark}>
              <Ionicons name="code-slash" size={18} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.brandTitle}>Lab Mobile</Text>
              <Text style={styles.brandSubtitle}>UTS Praktikum</Text>
            </View>
          </View>
          <View style={styles.npmPill}>
            <Text style={styles.npmText}>2532039</Text>
          </View>
        </View>

        <View style={styles.content}>
          {tab === 'info' ? (
            <ScrollView
              contentContainerStyle={styles.infoContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.eyebrow}>RINGKASAN TUGAS</Text>
              <Text style={styles.heading}>Halo, Vincent</Text>
              <Text style={styles.subheading}>
                Berikut status tugas praktikum kamu hari ini.
              </Text>

              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>Tugas Praktikum</Text>
                <View style={styles.countPill}>
                  <Text style={styles.countText}>{TUGAS.length} tugas</Text>
                </View>
              </View>

              <View style={styles.cards}>
                {TUGAS.map((tugas) => (
                  <InfoCard
                    key={tugas.id}
                    title={tugas.title}
                    status={tugas.status}
                    onPress={() => showTaskDetail(tugas.title, tugas.status)}
                  />
                ))}
              </View>

              <View style={styles.tip}>
                <Ionicons name="search-outline" size={18} color={colors.primary} />
                <Text style={styles.tipText}>
                  Buka tab <Text style={styles.tipStrong}>Mahasiswa</Text> untuk mencoba pencarian
                  direktori secara langsung.
                </Text>
              </View>
            </ScrollView>
          ) : (
            <DirectoryScreen />
          )}
        </View>

        <View style={styles.tabBar}>
          {TABS.map((item) => {
            const active = item.key === tab;

            return (
              <TouchableOpacity
                key={item.key}
                accessibilityRole="tab"
                accessibilityLabel={item.label}
                accessibilityState={{ selected: active }}
                activeOpacity={0.8}
                onPress={() => setTab(item.key)}
                style={[styles.tabItem, active && styles.tabItemActive]}
              >
                <Ionicons
                  name={active ? item.activeIcon : item.icon}
                  size={20}
                  color={active ? colors.primary : colors.muted}
                />
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  brand: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  brandMark: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  brandTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  brandSubtitle: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 1,
  },
  npmPill: {
    backgroundColor: '#E0E7FF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  npmText: {
    color: '#3730A3',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  content: {
    flex: 1,
  },
  infoContent: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  heading: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.6,
    marginTop: spacing.xs,
  },
  subheading: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 2,
  },
  sectionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  countPill: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  countText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '600',
  },
  cards: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  tip: {
    alignItems: 'flex-start',
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
    padding: spacing.md,
  },
  tipText: {
    color: '#1E40AF',
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  tipStrong: {
    fontWeight: '800',
  },
  tabBar: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  tabItem: {
    alignItems: 'center',
    borderRadius: radius.md,
    flex: 1,
    gap: 3,
    paddingVertical: 8,
  },
  tabItemActive: {
    backgroundColor: '#EFF6FF',
  },
  tabLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
