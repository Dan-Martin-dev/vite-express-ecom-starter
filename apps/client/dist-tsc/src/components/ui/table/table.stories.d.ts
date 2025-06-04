import { Meta, StoryObj } from '@storybook/react';
import { Table } from './table';
declare const meta: Meta<typeof Table>;
export default meta;
type User = {
    id: string;
    createdAt: number;
    name: string;
    title: string;
    role: string;
    email: string;
};
type Story = StoryObj<typeof Table<User>>;
export declare const Default: Story;
//# sourceMappingURL=table.stories.d.ts.map