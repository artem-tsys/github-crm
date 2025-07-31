import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useAuthCheck } from '@/features/auth/model/useAuthCheck';
import { LoginForm } from '@/features/auth/ui/Login-form';
import styles from './login-page.module.scss';

const { Title } = Typography;

export const LoginPage = () => {
  useAuthCheck();
  return (
	<div className={styles.container}>
	  <Card className={styles.card}>
		<Title level={3}>Sign In</Title>
		<LoginForm />
		<div className={styles.registerLink}>
		  <Typography.Text>
			Ще не маєте акаунта?{' '}
			<Link to="/register">Зареєструйтесь</Link>
		  </Typography.Text>
		</div>
	  </Card>
	</div>
  );
};
