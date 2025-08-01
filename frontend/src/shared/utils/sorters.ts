export const sorters = <T = any>(field: keyof T) =>
	(a: T, b: T) => `${a[field]}`.localeCompare(`${b[field]}`);

export const sorterByNumber = <T = any>(field: keyof T) =>
	(a: T, b: T) => Number(a[field]) - Number(b[field]);

export const sorterByDate = <T = any>(field: keyof T) =>
	(a: T, b: T) => new Date(a[field] as any).getTime() - new Date(b[field] as any).getTime();
