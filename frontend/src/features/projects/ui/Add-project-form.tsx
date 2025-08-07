import { Form, Input, Button } from 'antd';
import { addProject } from '../api/add-project';

export const AddProjectForm = ({ onSuccess }: { onSuccess: () => void }) => {
	const [form] = Form.useForm();
	
	const onFinish = async ({ path }: { path: string }) => {
		await addProject(path);
		onSuccess();
		form.resetFields();
	};
	
	return (
		<Form form={form} layout="inline" onFinish={onFinish}>
			<Form.Item
				name="path"
				rules={[{ required: true, message: 'Enter in format owner/repo' }]}
			>
				<Input placeholder="facebook/react"  />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Add
				</Button>
			</Form.Item>
		</Form>
	);
};
