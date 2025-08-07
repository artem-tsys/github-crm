import { Button, Form, Input } from 'antd';
import { useEffect } from "react";
import { mapErrorsToAntd } from "../lib/map-errors-to-antd";
import type { SignInDto } from '../model/types';
import { useSignIn } from '../model/useSignIn';

/**
 * LoginForm component
 *
 * Sign-in form using Ant Design and useSignIn hook.
 *
 * - Submits credentials to backend
 * - Maps server-side errors to Antd fields via mapErrorsToAntd
 * - Shows global form error if needed
 * - Disables submit during loading
 * - Uses autoComplete="current-password" for password field
 * - On success, backend sets auth tokens via HTTP-only cookies and redirects
 */
export const LoginForm = () => {
	const [form] = Form.useForm<SignInDto>();
	const { submit, fieldErrors, formError, isSubmitting } = useSignIn();

	useEffect(() => {
		if (fieldErrors) {
			form.setFields(mapErrorsToAntd(fieldErrors));
		}
	}, [fieldErrors, form]);
	
	return (
	<Form form={form} onFinish={submit} layout="vertical">
	  <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]} validateTrigger="onSubmit">
		<Input />
	  </Form.Item>

	  <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]} validateTrigger="onSubmit">
		  <Input.Password autoComplete="current-password" />
	  </Form.Item>

	  <Form.Item>
		<Button type="primary" htmlType="submit" block loading={isSubmitting}>
		  Sign In
		</Button>
	  </Form.Item>
		{formError && (
			<Form.Item validateStatus="error" help={formError} />
		)}
	</Form>
	);
};
