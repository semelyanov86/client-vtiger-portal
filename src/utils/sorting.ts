export function getSortingValue(column: string, oldValue: string) {
  // project_no -> -project_no
  if (column === oldValue) {
    return '-' + column;
  }
  // -project_no -> project-no
  if ('-' + column === oldValue) {
    return column;
  }
  return column;
}
