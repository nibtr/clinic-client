import { type Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { DENTIST_ROLE } from './constants/auth';
import { errorConfig } from './requestErrorConfig';
const loginPath = '/login';

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: TCurrentUser;
  fetchUserInfo?: () => Promise<TCurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    return {
      username: 'abc',
      role: DENTIST_ROLE,
    };
  };

  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    childrenRender: (children) => {
      return <main>{children}</main>;
    },
    ...initialState?.settings,
  };
};

export const request = {
  ...errorConfig,
};
