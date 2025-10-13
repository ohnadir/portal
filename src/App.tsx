import { RouterProvider } from "react-router-dom";
import router from "./routes";
import '@ant-design/v5-patch-for-react-19';

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App