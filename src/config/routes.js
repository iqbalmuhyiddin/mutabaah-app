import Login from "containers/login";
import Form from "containers/form";

const routes = [
  {
    path: "/auth/login",
    component: Login,
    isPublic: true
  },
  {
    path: "/",
    component: Form,
    isPublic: false
  }
];

export default routes;
