import { Card, Typography } from 'antd';
import { RegisterForm } from '@/features/auth/ui/Register-form';
import styles from './register-page.module.scss';

const { Title } = Typography;

export const RegisterPage = () => {
	return (
		<div className={styles.container}>
			<Card className={styles.card}>
				<Title level={3}>Register</Title>
				<RegisterForm />
			</Card>
		</div>
	);
};
