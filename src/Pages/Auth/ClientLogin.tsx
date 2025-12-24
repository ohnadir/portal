/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, notification, type FormProps } from "antd";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useClientLoginMutation } from "../../redux/apiSlices/clientSlice";

const ClientLogin = () => {
    const [clientLogin] = useClientLoginMutation();
    const navigate = useNavigate()
    const [api, contextHolder] = notification.useNotification();

    const onFinish: FormProps["onFinish"] = async (values) => {
        await clientLogin(values)
            .unwrap()
            .then(({ data }) => {
                navigate(`/client-transations/${data._id}`);
            })
            .catch((error) => {
                if (error?.errorMessages?.length > 0) {
                    if (Array.isArray(error.errorMessages)) {
                        error.errorMessages.forEach((err: any) => {
                            api.error({
                                message: 'Error',
                                description: err?.message || 'Something went wrong.',
                            });
                        });
                    }
                } else {
                    api.error({
                        message: 'Error',
                        description: error?.message || 'Something went wrong.',
                    });
                }
            });
    };

    return (
        <div className="w-full h-[100vh] bg-[#8AC5D2] flex items-center justify-center">
            {contextHolder}
            <div className="p-10 rounded-[12px] bg-white w-[630px]">
                <img src={Logo} alt="" className="w-[140px] h-[50px] mx-auto mb-5" />
                <h1 className="text-[32px] text-black text-center font-medium"> Login to Account</h1>
                <Form layout="vertical" className="grid grid-cols-1 gap-4" onFinish={onFinish}>

                    <Form.Item
                        style={{ marginBottom: 0 }}
                        label="User Name"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            }
                        ]}
                    >
                        <Input
                            placeholder="Enter your username"
                            style={{
                                border: "1px solid #E0E4EC",
                                height: "52px",
                                background: "white",
                                borderRadius: "8px",
                                outline: "none",
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{ marginBottom: 0 }}
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            }
                        ]}
                    >
                        <Input.Password
                            type="password"
                            placeholder="Enter your password"
                            style={{
                                border: "1px solid #E0E4EC",
                                height: "52px",
                                background: "white",
                                borderRadius: "8px",
                                outline: "none",
                            }}
                        />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{
                                height: "52px",
                                fontWeight: "400px",
                                fontSize: "18px",
                                background: "#00809E",
                            }}
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ClientLogin;