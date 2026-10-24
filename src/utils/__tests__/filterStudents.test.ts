import { filterStudents } from '../filterStudents';
import type { Student } from '../../types';

const STUDENTS: Student[] = [
  { id: '1', nama: 'Alifia Putri', prodi: 'Sistem Informasi' },
  { id: '2', nama: 'Budi Santoso', prodi: 'Teknologi Informasi' },
  { id: '3', nama: 'Citra Dewi', prodi: 'Sistem Informasi' },
];

describe('filterStudents', () => {
  it('returns every student when the keyword is empty', () => {
    expect(filterStudents(STUDENTS, '')).toEqual(STUDENTS);
  });

  it('ignores surrounding whitespace in the keyword', () => {
    expect(filterStudents(STUDENTS, '   ')).toEqual(STUDENTS);
  });

  it('matches a partial name regardless of letter casing', () => {
    expect(filterStudents(STUDENTS, 'ALIF')).toEqual([STUDENTS[0]]);
    expect(filterStudents(STUDENTS, 'santoso')).toEqual([STUDENTS[1]]);
  });

  it('returns an empty list when no name matches', () => {
    expect(filterStudents(STUDENTS, 'zulkifli')).toEqual([]);
  });
});
