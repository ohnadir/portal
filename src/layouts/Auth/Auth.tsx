import { Outlet } from 'react-router-dom';

const Auth = () => {
    return (
        <div className="w-full h-[100vh]">
            <Outlet />
        </div>
    );
};

export default Auth;