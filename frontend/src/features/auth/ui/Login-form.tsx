import { Button, Form, Input } from 'antd';
import { useEffect } from "react";
import { mapErrorsToAntd } from "../lib/map-errors-to-antd";
import type { SignInDto } from '../model/types';
import { useSignIn } from '../model/useSignIn';

/**
 * LoginForm component
 *
 * Key details:
 * - Integrates with Ant Design Form for built-in validation and error display.
 * - Uses custom hook useSignIn for API call, error handling, and loading state.
 * - Server-side validation errors are mapped to Antd format via mapErrorsToAntd,
 *   allowing field-level error display (UX best practice).
 * - On successful login, JWT token is stored in localStorage (note: localStorage is vulnerable to XSS).
 * - No global auth context is used for simplicity; token is read directly where needed.
 * - Errors are reset on new submit, so user always sees only relevant feedback.
 * - All form logic is isolated for testability and reusability.
 */

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
	  <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]} validateTrigger="onSubmit">
		<Input />
	  </Form.Item>

	  <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]} validateTrigger="onSubmit">
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
