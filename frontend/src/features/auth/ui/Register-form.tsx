import { Button, Form, Input } from 'antd';
import { useEffect } from "react";
import { mapErrorsToAntd } from "../lib/map-errors-to-antd";
import { useRegister } from '../model/useRegister';
import type { RegisterDto } from '../model/types';

/**
 * RegisterForm component
 *
 * User registration form using Ant Design and useRegister hook.
 *
 * - Sends credentials to backend
 * - Maps server-side errors to fields via mapErrorsToAntd
 * - Displays global form error if needed
 * - Disables submit if untouched or submitting
 * - Uses autoComplete="current-password" for password field
 * - On success, backend sets auth tokens via HTTP-only cookies and redirects
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
			<Input.Password autoComplete="current-password" />
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
