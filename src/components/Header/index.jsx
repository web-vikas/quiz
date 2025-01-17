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
        navigate('/dashboard');
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

  

  return (
    <header className="flex justify-between items-center w-full">
      <Link to="/">
        <Image src={siteLogoDark} height={43} preview={false} />
      </Link>
      <div className="flex items-center justify-end">
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
              {userSession?.name?.charAt(0)}
            </Avatar>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};
