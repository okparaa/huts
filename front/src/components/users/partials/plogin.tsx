import { useLazyQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import { gql } from "../../../__generated__";
import { LockIcon } from "lucide-react";
import * as yup from "yup";
import Input from "../../lib/inputs";

const initialValues: any = {
  username: "",
  password: "",
};
const LoginSchema = yup.object({
  username: yup
    .string()
    .email("invalid username")
    .required("username is required"),
  password: yup.string().required("password is required"),
});

const LOGIN = gql(`
  query LoginUser($user: loginUserInput!) {
    signIn(user: $user) {
      id
      username
      token
      photo_url
      phone
    }
  }
`);
const Plogin = () => {
  const [signIn, { data, loading, error }] = useLazyQuery(LOGIN);

  const xPost = async (values: any) => {
    signIn({
      variables: {
        user: values,
      },
    });
    console.log("ifeanyi", values);
    console.log(data);
  };
  console.log("okpara", data?.signIn, loading, error);

  if (data && data.signIn && data.signIn.token) {
    localStorage.setItem("token", data.signIn.token);
  }

  const inputClass = (width: string) => `primary peer ${width}`;
  const labelClass = () =>
    "primary peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1";

  return (
    <>
      <LockIcon className="w-32 h-32 mb-4 border-8 bg-blue-200 p-4 rounded-full" />
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={xPost}
      >
        {(props) => (
          <Form className="flex flex-col items-center form">
            <Input
              errorContainer="div"
              inputClass={inputClass("w-[90%]")}
              labelClass={labelClass()}
              name="username"
              placeholder="Username"
              {...props}
            />
            <Input
              errorContainer="div"
              inputClass={inputClass("w-[90%]")}
              labelClass={labelClass()}
              name="password"
              placeholder="Password"
              type="password"
              {...props}
            />
            {data && data.signIn && !data.signIn.token && (
              <span>invalid username or password</span>
            )}
            <button type="submit" className="bg-blue-200 text-black">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Plogin;
