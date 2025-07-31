import { Card, Typography } from 'antd';
import { LoginForm } from '@/features/auth/ui/Login-form';
import styles from './login-page.module.scss';

const { Title } = Typography;

export const LoginPage = () => {
	return (
		<div className={styles.container}>
			<Card className={styles.card}>
				<Title level={3}>Sign In</Title>
				<LoginForm />
			</Card>
		</div>
	);
};
