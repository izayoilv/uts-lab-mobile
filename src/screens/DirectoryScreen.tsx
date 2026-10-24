import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { DAFTAR_MAHASISWA } from '../data/mahasiswa';
import { colors, radius, spacing } from '../theme';
import type { Student } from '../types';
import { filterStudents } from '../utils/filterStudents';

function initials(nama: string) {
  return nama
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
}

function StudentRow({ student }: { student: Student }) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Text style={styles.avatarLabel}>{initials(student.nama)}</Text>
      </View>
      <View style={styles.rowText}>
        <Text style={styles.name}>{student.nama}</Text>
        <Text style={styles.prodi}>{student.prodi}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.iconMuted} />
    </View>
  );
}

export function DirectoryScreen() {
  const [keyword, setKeyword] = useState('');

  const results = useMemo(() => filterStudents(DAFTAR_MAHASISWA, keyword), [keyword]);

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <StudentRow student={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.eyebrow}>DIREKTORI MAHASISWA</Text>
          <Text style={styles.heading}>Cari Mahasiswa</Text>
          <Text style={styles.subheading}>
            Ketik nama untuk menyaring daftar secara langsung.
          </Text>

          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={colors.muted} />
            <TextInput
              value={keyword}
              onChangeText={setKeyword}
              placeholder="Cari nama mahasiswa..."
              placeholderTextColor={colors.iconMuted}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              style={styles.input}
            />
            {keyword.length > 0 ? (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Hapus pencarian"
                hitSlop={8}
                onPress={() => setKeyword('')}
              >
                <Ionicons name="close-circle" size={18} color={colors.iconMuted} />
              </TouchableOpacity>
            ) : null}
          </View>

          <Text style={styles.resultCount}>{results.length} mahasiswa ditemukan</Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name="search-outline" size={26} color={colors.muted} />
          </View>
          <Text style={styles.emptyTitle}>Data tidak ditemukan!</Text>
          <Text style={styles.emptyHint}>Coba kata kunci lain atau periksa ejaan nama.</Text>
        </View>
      }
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  header: {
    paddingBottom: spacing.md,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  heading: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.4,
    marginTop: spacing.xs,
  },
  subheading: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 2,
  },
  searchBar: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  input: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    paddingVertical: 12,
  },
  resultCount: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: spacing.md,
  },
  separator: {
    height: 10,
  },
  row: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#E0E7FF',
    borderRadius: 999,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  avatarLabel: {
    color: '#3730A3',
    fontSize: 13,
    fontWeight: '800',
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  prodi: {
    color: colors.muted,
    fontSize: 12,
  },
  empty: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  emptyIcon: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 999,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  emptyHint: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});
