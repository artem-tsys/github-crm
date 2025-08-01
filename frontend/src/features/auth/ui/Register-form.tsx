import { Button, Form, Input } from 'antd';
import { useEffect } from "react";
import { mapErrorsToAntd } from "../lib/map-errors-to-antd";
import { useRegister } from '../model/useRegister';
import type { RegisterDto } from '../model/types';

/**
 * RegisterForm component
 *
 * Features & notes:
 * - Handles user registration with Ant Design Form and custom hook useRegister.
 * - Maps server-side validation errors to Antd fields for better UX.
 * - On successful registration, stores JWT token in localStorage and redirects to protected route.
 * - No global auth context is used; token is managed locally for simplicity.
 * - All logic is isolated for testability and reusability.
 * - Storing JWT in localStorage is simple but has XSS risks; consider alternatives for production.
 * - Errors are reset on new submit, so user always sees only relevant feedback.
 */

export const RegisterForm = () => {
	const [form] = Form.useForm<RegisterDto>();
	const { submit, fieldErrors, formError, isSubmitting } = useRegister();
	
	useEffect(() => {
		if (fieldErrors) {
			form.setFields(mapErrorsToAntd(fieldErrors));
		}
	}, [fieldErrors, form])

	return (
	<Form form={form} onFinish={submit} layout="vertical">
		<Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]} validateTrigger="onSubmit">
			<Input />
		</Form.Item>

		<Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]} validateTrigger="onSubmit">
			<Input.Password />
		</Form.Item>

		<Form.Item>
			<Button
				type="primary"
				htmlType="submit"
				block
				loading={isSubmitting}
				disabled={!form.isFieldsTouched(true) || isSubmitting}
			>
				Register
			</Button>
		</Form.Item>
		{formError && (
			<Form.Item validateStatus="error" help={formError} />
		)}
	</Form>
	);
};
