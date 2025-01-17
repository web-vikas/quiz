/**
 * @version 0.0.1
 *  Updated On : Sep 09, 2024
 * This is the Login page.
 */

import { Button, Checkbox, Form, Image, Input } from 'antd';
import { LockIcon, MailIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { siteLogoDark } from 'src/assets';
import { AuthCarousal } from 'src/components/AuthHero';
import { useErrorLog } from 'src/hooks';
import { login } from 'src/redux/action';
import { API } from 'src/services';

export const Login = () => {
  //-------------- State & Variables --------------//
  const handleError = useErrorLog('pages/Login');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userSession } = useSelector((state) => state.session);

  //-------------- Use Effects --------------//

  //-------------- Other Methods --------------//

  /**
   * On Login click
   * @param {obj} values - username password rememberMe
   */
  const onLogin = async (values) => {
    try {
      const response = await API.Login(
        { email: values.username, password: values.password },
        'Login successfully.',
        'Loading ...'
      );
      if (response) {
        dispatch(login(response?.data));
        navigate('/dashboard');
      }
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className=" bg-white shadow flex justify-center flex-1">
          <AuthCarousal />
          <div className="lg:w-1/2 xl:w-6/12 p-6 sm:p-12 flex items-center justify-center">
            <div className="flex flex-col items-start max-w-full md:w-[500px]">
              <Image src={siteLogoDark} className="w-28" preview={false} />
              <h1 className="text-lg xl:text-3xl text-black font-bold">Login to your Account</h1>
              <p className="text-lg py-3 text-text-color">Welcome Back! Select method to login:</p>
              <div className="w-full flex-1 mt-8">
                <div className="">
                  <Form onFinish={onLogin}>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your username!'
                        }
                      ]}
                    >
                      <Input
                        placeholder="Email"
                        size="large"
                        prefix={<MailIcon strokeWidth={1.2} height={16} />}
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!'
                        }
                      ]}
                    >
                      <Input.Password
                        size="large"
                        placeholder="Password"
                        prefix={<LockIcon strokeWidth={1.2} height={16} />}
                      />
                    </Form.Item>
                    <div className="flex justify-between flex-row items-center">
                      <Form.Item name="remember">
                        <div className="flex flex-row gap-2">
                          <Checkbox>Remember Me</Checkbox>
                        </div>
                      </Form.Item>
                    </div>
                    <Form.Item>
                      <Button
                        type="primary"
                        block
                        className="w-full"
                        htmlType="submit"
                        size="large"
                      >
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
