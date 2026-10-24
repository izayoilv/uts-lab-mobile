import type { Student } from '../types';

export function filterStudents(students: Student[], keyword: string): Student[] {
  const query = keyword.trim().toLowerCase();

  if (!query) {
    return students;
  }

  return students.filter((student) => student.nama.toLowerCase().includes(query));
}
