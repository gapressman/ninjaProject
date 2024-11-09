import { Device } from "../queries/useGetDevices";

export type SortTypes = 'hdd_capacity' | 'system_name';
export type SortOrder = 'descending' | 'ascending';
export interface SortOption {
    value: SortTypes;
    descending: boolean;
}

export type Sort = `${SortTypes} ${SortOrder}`;

// Need to do some casting, but it's type safe
export const sortDevices = (devices: Device[], sort: Sort) => {
    const [_sortType, sortDirection] = sort.split(' ');
    const sortType = _sortType as SortTypes;

    return [...devices].sort((_a, _b) => {
        const a = _a[sortType];
        const b = _b[sortType];

        // Have to convert to numbers to get accurate sort here
        const aSort = sortType === 'hdd_capacity' ? Number(a) : a;
        const bSort = sortType === 'hdd_capacity' ? Number(b) : b;

        if (aSort === bSort) {
            return 0;
        }

        if (sortDirection === 'descending') {
            return aSort < bSort ? 1 : -1;
        } else {
            return aSort > bSort ? 1 : -1;
        }
    });
};