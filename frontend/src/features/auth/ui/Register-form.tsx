import { Button, Form, Input } from 'antd';
import { useEffect } from "react";
import { mapErrorsToAntd } from "../lib/map-errors-to-antd";
import { useRegister } from '../model/useRegister';
import type { RegisterDto } from '../model/types';

export const RegisterForm = () => {
	const [form] = Form.useForm<RegisterDto>();
	const { submit, errors, isSubmitting } = useRegister();
	
	useEffect(() => {
		if (errors) {
			console.log(errors);
			form.setFields(mapErrorsToAntd(errors));
		}
	}, [errors, form])

	return (
		<Form form={form} onFinish={submit} layout="vertical">
			<Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
				<Input />
			</Form.Item>
			
			<Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
				<Input.Password />
			</Form.Item>
			
			<Form.Item>
				<Button type="primary" htmlType="submit" block loading={isSubmitting}>
					Register
				</Button>
			</Form.Item>
		</Form>
	);
};
