import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import type { TaskStatus } from '../types';

type InfoCardProps = {
  title: string;
  status: TaskStatus;
  onPress: () => void;
};

type StatusStyle = {
  label: string;
  backgroundColor: string;
  textColor: string;
  dotColor: string;
};

const STATUS_STYLE: Record<TaskStatus, StatusStyle> = {
  selesai: {
    label: 'Selesai',
    backgroundColor: colors.successBg,
    textColor: colors.successText,
    dotColor: colors.successText,
  },
  proses: {
    label: 'Proses',
    backgroundColor: colors.warningBg,
    textColor: colors.warningText,
    dotColor: colors.warningText,
  },
};

export function InfoCard({ title, status, onPress }: InfoCardProps) {
  const statusStyle = STATUS_STYLE[status];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.badge, { backgroundColor: statusStyle.backgroundColor }]}>
          <View style={[styles.dot, { backgroundColor: statusStyle.dotColor }]} />
          <Text style={[styles.badgeLabel, { color: statusStyle.textColor }]}>
            {statusStyle.label}
          </Text>
        </View>
      </View>

      <Text style={styles.hint}>Ketuk tombol di bawah untuk melihat rincian tugas.</Text>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Lihat Detail"
        activeOpacity={0.85}
        onPress={onPress}
        style={styles.action}
      >
        <Text style={styles.actionLabel}>Lihat Detail</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.xl,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  title: {
    color: colors.text,
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
  },
  badge: {
    alignItems: 'center',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dot: {
    borderRadius: 999,
    height: 6,
    width: 6,
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  hint: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.sm,
  },
  action: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginTop: spacing.lg,
    paddingVertical: 12,
  },
  actionLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
