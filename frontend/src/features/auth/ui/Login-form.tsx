import { Button, Form, Input } from 'antd';
import { useEffect } from "react";
import { mapErrorsToAntd } from "../lib/map-errors-to-antd";
import type { SignInDto } from '../model/types';
import { useSignIn } from '../model/useSignIn';

export const LoginForm = () => {
	const [form] = Form.useForm<SignInDto>();
	const { submit, errors, isSubmitting } = useSignIn();

	useEffect(() => {
		if (errors) {
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
					Sign In
				</Button>
			</Form.Item>
		</Form>
	);
};
