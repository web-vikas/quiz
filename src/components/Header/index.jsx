import { Avatar, Dropdown, Image, Switch, Typography } from 'antd';
import { KeyRoundIcon, LayoutGrid, LogOutIcon, User, UserCheck2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { siteLogoDark } from 'src/assets';
import { login, logout } from 'src/redux/action';

export const Header = () => {
  //-------------- State & Variables --------------//
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  const { userSession } = useSelector((state) => state.session);
  const items = [
    {
      label: <Typography>Dashboard</Typography>,
      key: '0',
      icon: <LayoutGrid strokeWidth={1.8} height={18} />,
      onClick: () => {
        if (userSession.role?.role_name == 'USER') navigate('/dashboard');
        if (userSession.role?.role_name == 'MANAGER') navigate('/manager-dashboard');
      }
    },

    {
      label: <Typography>Logout</Typography>,
      key: '2',
      icon: <LogOutIcon strokeWidth={1.8} height={18} className="text-danger" />,
      onClick: () => {
        dispatch(logout());
        navigate('/');
      }
    }
  ];

  //-------------- Other Methods --------------//

  useEffect(() => {
    if (userSession?.role) {
      const isUserCheck = userSession.role.role_name === 'USER';
      setIsUser(isUserCheck);
    }
  }, []);

  const onManagerToggle = () => {
    const role = { ...userSession.role };
    if (isUser) {
      role.role_name = 'MANAGER';
    } else {
      role.role_name = 'USER';
    }
    setIsUser(!isUser);
    dispatch(login({ ...userSession, role: role, isManager: true }));
    if (!isUser) navigate('/dashboard');
    else navigate('/manager-dashboard');
  };

  return (
    <header className="flex justify-between items-center w-full">
      <Link to="/">
        <Image src={siteLogoDark} height={43} preview={false} />
      </Link>
      <div className="flex items-center justify-end">
        {userSession.isManager && (
          <>
            <Typography className="text-lg font-semibold text-primary mr-3">
              {userSession?.role?.role_name}
            </Typography>
            <Switch
              value={isUser}
              size="default"
              onChange={onManagerToggle}
              checkedChildren={<UserCheck2 size={20} />}
              unCheckedChildren={<User size={20} />}
            />
          </>
        )}
        <Dropdown
          className="p-3 z-[999]"
          overlayClassName="!bg-white rounded-lg !w-52 "
          menu={{
            items
          }}
          placement="bottomLeft"
          trigger={['click']}
        >
          <div className="flex justify-end">
            <Avatar
              size="large"
              shape="circle"
              className="font-semibold text-lg cursor-pointer border-2 border-primary"
            >
              {userSession?.first_name?.charAt(0)}
            </Avatar>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};
