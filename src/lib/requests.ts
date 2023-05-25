interface Sorting {
  id: string;
  desc: boolean;
}

export function convertSortingToSort(data: Sorting): string {
  let result = '';
  if (data.desc) {
    result = '-';
  }
  return result + data.id;
}
