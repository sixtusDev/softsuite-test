import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';

import { DashboardIcon } from '../../../assets/icons/dashboardIcon';
import { ActivityIcon } from '../../../assets/icons/activityIcon';
import { StructureIcon } from '../../../assets/icons/structure';
import { GearIcon } from '../../../assets/icons/gearIcon';
import { UsersIcon } from '../../../assets/icons/usersIcon';

import SwitchIcon from '../../../assets/icons/switch.svg?react';
import HomeIcon from '../../../assets/icons/home.svg?react';
import Logo from '../../../assets/icons/logo.svg?react';

import './AppLayout.scss';
import { ContextSwitcher } from '../ContextSwitcher';
import { Search } from '../Search';

const { Header, Content, Sider } = Layout;

type AppLayoutProps = {
  children?: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [contentHeight, setContentHeight] = useState('auto');
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>();

  const contentRef = useRef(null);
  const headerRef = useRef<any>(null);
  const footerRef = useRef<any>(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    function updateContentHeight() {
      const headerHeight = headerRef.current.offsetHeight;
      const footerHeight = footerRef.current.offsetHeight;

      const newHeight = window.innerHeight - headerHeight - footerHeight;
      setContentHeight(`${newHeight}px`);
    }

    window.addEventListener('resize', updateContentHeight);
    updateContentHeight();

    return () => window.removeEventListener('resize', updateContentHeight);
  }, [headerRef, footerRef]);

  const menuItems = useMemo(() => {
    const { key } = selectedMenuItem || {};

    return [
      {
        label: 'Dashboard',
        icon: <DashboardIcon color={key === '1' ? '#fff' : undefined} />,
        key: '1',
      },
      {
        label: 'Payroll Activities',
        icon: <ActivityIcon />,
        key: '2',
        children: [{ label: 'Payroll Run', key: 3 }],
      },
      {
        label: 'Salary Structure',
        icon: <StructureIcon color={key === '4' ? '#fff' : undefined} />,
        key: '4',
      },
      {
        label: 'Element Setup',
        icon: <GearIcon />,
        key: '5',
        children: [
          { label: 'Elements', key: 6 },
          { label: 'Balances', key: 7 },
        ],
      },
      { label: 'Employees', icon: <UsersIcon color={key === '8' ? '#fff' : undefined} />, key: 8 },
    ];
  }, [selectedMenuItem]);

  return (
    <Layout className="AppLayout">
      <Header className="AppLayout__header" ref={headerRef}>
        <Logo />
        <ContextSwitcher
          menuStyle={{
            backgroundColor: '#F6F7F9',
            minWidth: '250px',
            padding: '5px',
            marginLeft: '70px',
          }}
          Icon={HomeIcon}
          label="Switch Module"
          options={[
            { label: 'System Administartion', value: '0' },
            { label: 'People Management', value: '1' },
            { label: 'Payroll Management', value: '2' },
            { label: 'Self Service', value: '3' },
          ]}
        />
        <Search style={{ width: '354px', marginLeft: '30px' }} />
      </Header>
      <Layout>
        <Sider width={250} className="AppLayout__sidebar" style={{ background: colorBgContainer }}>
          <ContextSwitcher
            Icon={SwitchIcon}
            label="Switch Module"
            options={[
              { label: 'System Administartion', value: '0' },
              { label: 'People Management', value: '1' },
              { label: 'Payroll Management', value: '2' },
              { label: 'Self Service', value: '3' },
            ]}
            menuStyle={{ padding: '0 30px', marginBottom: '30px' }}
          />
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            className="AppLayout__menu"
            items={menuItems}
            onSelect={(item) => {
              setSelectedMenuItem(item);
            }}
          />
        </Sider>
        <Layout
          ref={contentRef}
          style={{ padding: '0 24px 24px', minHeight: contentHeight, overflowY: 'auto' }}
        >
          <Breadcrumb style={{ margin: '16px 0' }} separator=">">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="AppLayout__content"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
            <Outlet />
          </Content>
          <Footer className="AppLayout__footer" ref={footerRef}>
            <p>©{new Date().getFullYear()} SoftSuite. All rights reserved.</p>
            <p>support@softsuite.com</p>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
