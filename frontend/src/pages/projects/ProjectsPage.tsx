import { Typography } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

export const ProjectsPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/sign-in');
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Title level={2}>Projects</Title>
    </div>
  );
};
