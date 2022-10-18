import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Main from "./component/Layout/Main";
import LoginBootstrap from "./component/Login/LoginBootstrap";
import RegisterReact from "./component/RegisterReact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <RegisterReact></RegisterReact> },
      { path: "register", element: <RegisterReact></RegisterReact> },
      { path: "/login", element: <LoginBootstrap></LoginBootstrap> },
    ],
  },
]);

function App() {
  return (
    <div className="w-50 mx-auto">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
