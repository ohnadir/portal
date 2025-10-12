import { Navigate, useLocation } from "react-router-dom";
import { useProfileQuery } from "../redux/apiSlices/userSlice";
import Logo from "../assets/logo.png";


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const { data: profile, isLoading, isFetching, isError } = useProfileQuery(undefined);

  if (isLoading || isFetching) {
    return <div className='w-full h-dvh flex items-center justify-center'>
      <img src={Logo} alt="" className="w-[140px] h-[50px] mx-auto mb-5" />
    </div>
  }

  if (isError || !profile) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  if (profile?.role === "SUPER_ADMIN") {
    return children;
  }


  // return <Navigate to="/auth" />;
};

export default PrivateRoute;