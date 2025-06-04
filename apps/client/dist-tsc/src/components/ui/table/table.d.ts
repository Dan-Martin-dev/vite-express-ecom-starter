import * as React from 'react';
import { BaseEntity } from '@/types/api';
import { TablePaginationProps } from './pagination';
declare const TableElement: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React.ForwardRefExoticComponent<React.ThHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React.ForwardRefExoticComponent<React.TdHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableCaptionElement> & React.RefAttributes<HTMLTableCaptionElement>>;
export { TableElement, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, };
type TableColumn<Entry> = {
    title: string;
    field: keyof Entry;
    Cell?({ entry }: {
        entry: Entry;
    }): React.ReactElement;
};
export type TableProps<Entry> = {
    data: Entry[];
    columns: TableColumn<Entry>[];
    pagination?: TablePaginationProps;
};
export declare const Table: <Entry extends BaseEntity>({ data, columns, pagination, }: TableProps<Entry>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=table.d.ts.map