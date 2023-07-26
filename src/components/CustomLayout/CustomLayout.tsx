import LogOutIcon from '@/assets/svg/LogOutIcon';
import ToothIcon from '@/assets/svg/ToothIcon';
import { LOGIN_LINK } from '@/constants/internalLink';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Link, useModel } from '@umijs/max';
import { Card, Layout, Menu, Typography } from 'antd';
import { useState } from 'react';
import './CustomLayout.less';

interface ICustomLayoutProps {
  children: React.ReactNode;
  menuItems: TMenuItem[];
}

const { Sider, Content } = Layout;

function CustomLayout({ children, menuItems }: ICustomLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  const { initialState } = useModel('@@initialState');
  console.log('initialState', initialState?.username);
  return (
    <main className="custom-layout-wrapper">
      <Layout>
        <Sider className="sider" trigger={null} collapsible theme="light" collapsed={collapsed}>
          <div className="logo flex-center">
            <ToothIcon width={32} height={32} />
            <div
              className={`trans-effect text-trans wrap-logo-header ${collapsed ? 'collapsed' : ''}`}
            >
              <Typography.Paragraph ellipsis={{ rows: 1 }} className="logo-title">
                Dental clinic
              </Typography.Paragraph>
              <p className="username">@{initialState?.username}</p>
            </div>
            <button
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              className="button-collapse flex-center"
            >
              {collapsed ? <RightOutlined /> : <LeftOutlined />}
            </button>
          </div>
          <Menu mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
          <Link to={LOGIN_LINK} replace className="flex-center log-out-btn">
            <LogOutIcon width={20} height={20} />
            <div className={`trans-effect text-trans ${collapsed ? 'collapsed' : ''}`}>
              <span className="log-out-text">Log Out</span>
            </div>
          </Link>
        </Sider>

        <Layout>
          <Content className="content-wrapper">
            <Card className="card-wrapper">{children}</Card>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
}

export default CustomLayout;
