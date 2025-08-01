import type { ColumnsType } from 'antd/es/table';
import type { Project } from '../model/types';
import { sorters, sorterByNumber, sorterByDate } from '@/shared/utils/sorters';
import { Button, Space } from 'antd';

interface Handlers {
	onRefresh: (id: string) => void;
	onDelete: (id: string) => void;
	loadingId: string | null;
}

export const getProjectColumns = ({
	onRefresh,
	onDelete,
	loadingId,
}: Handlers): ColumnsType<Project> => [
	{
		title: 'Owner',
		dataIndex: 'owner',
		sorter: sorters<Project>('owner'),
	},
	{
		title: 'Name',
		dataIndex: 'name',
		sorter: sorters<Project>('name'),
	},
	{
		title: 'URL',
		dataIndex: 'url',
		render: (url) => <a href={url} target="_blank" rel="noreferrer">{url}</a>,
	},
	{
		title: 'Stars',
		dataIndex: 'stars',
		sorter: sorterByNumber<Project>('stars'),
	},
	{
		title: 'Forks',
		dataIndex: 'forks',
		sorter: sorterByNumber<Project>('forks'),
	},
	{
		title: 'Issues',
		dataIndex: 'issues',
		sorter: sorterByNumber<Project>('issues'),
	},
	{
		title: 'Created At',
		dataIndex: 'createdAt',
		sorter: sorterByDate<Project>('createdAt'),
		render: (ts) => new Date(ts * 1000).toUTCString(),
	},
	{
		title: 'Actions',
		render: (_, record) => (
			<Space>
				<Button
					onClick={() => onRefresh(record.id)}
					loading={loadingId === record.id}
				>
					Refresh
				</Button>
				<Button
					danger
					onClick={() => onDelete(record.id)}
					loading={loadingId === record.id}
				>
					Delete
				</Button>
			</Space>
		),
	},
];
