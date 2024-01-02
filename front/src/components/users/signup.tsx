import { Formik, Form } from "formik";

import { useRef } from "react";
import * as yup from "yup";
import { gql } from "../../__generated__";
import { Link } from "react-router-dom";
import Input from "../lib/inputs";
import Avatar from "../lib/avatar";
import { useMutation } from "@apollo/client";
import { Session, useSession } from "../lib/session";

const CREATE_USER = gql(`
  mutation CreateUser($user: createUserInput!) {
    createUser(user: $user) {
      id
      surname
      token
      firstname
      lastname
      phone
      address
      active
      username
      photo_url
      hashedPassword
      createdAt
      updatedAt
    }
  }
`);

const SignUp = () => {
  const session: Session | null = useSession();
  if (session && session.ver == "ok") {
  }
  const [k8User, _] = useMutation(CREATE_USER);
  const xPost = (values: any) => {
    k8User({ variables: { user: values } });
    console.log(values);
  };

  const initialValues: any = {
    username: "",
    password: "",
    password_verify: "",
    phone: "",
    address: "",
    firstname: "",
    lastname: "",
    surname: "",
  };

  const phoneRegx =
    /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

  const SignUpSchema = yup.object({
    username: yup
      .string()
      .email("username must be a valid email")
      .required("username is required"),
    password: yup.string().required("password is required"),
    password_verify: yup
      .string()
      .label("confirm password")
      .required("confirmation password is required")
      .oneOf([yup.ref("password")], "passwords must match"),
    phone: yup
      .string()
      .matches(phoneRegx, "Invalid phone number")
      .required("phone number is required"),
    address: yup.string().required("address is required"),
    firstname: yup.string().required("firstname is required"),
    lastname: yup.string().required("lastname is required"),
    surname: yup.string().required("surname is required"),
  });

  const avatarUrl = useRef("/user_photo.png");

  const updateAvatar = (imgSrc: string) => {
    avatarUrl.current = imgSrc;
  };

  const inputClass = (width: string) => `primary peer ${width}`;
  const labelClass = () =>
    "primary peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1";

  return (
    <div className="main">
      <div className="p-8 w-1/3 text-[20px] flex flex-col bg-gradient-to-tr from-blue-100 via-transparen to-transparent">
        <p>
          A hotel should relieve travelers of their insecurity and loneliness.
          It should make them feel warm and cozy.
        </p>
      </div>
      <div className="bg-gradient-to-tr from-transparent via-transparent to-blue-100 flex flex-col flex-1 justify-start pl-1 py-4">
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={xPost}
        >
          {(props) => (
            <Form className="flex flex-col w-[90%] form ml-10">
              <div>
                <Avatar updateAvatar={updateAvatar} avatarUrl={avatarUrl} />
              </div>
              <Input
                errorContainer="div"
                inputClass={inputClass("w-[60%]")}
                labelClass={labelClass()}
                name="firstname"
                placeholder="firstname"
                {...props}
              />
              <Input
                errorContainer="div"
                inputClass={inputClass("w-[60%]")}
                labelClass={labelClass()}
                name="lastname"
                placeholder="lastname"
                {...props}
              />
              <Input
                errorContainer="div"
                inputClass={inputClass("w-[60%]")}
                labelClass={labelClass()}
                name="surname"
                placeholder="surname"
                {...props}
              />
              <Input
                errorContainer="div"
                inputClass={inputClass("w-[70%]")}
                labelClass={labelClass()}
                name="username"
                placeholder="Username(email)"
                {...props}
              />
              <Input
                errorContainer="div"
                inputClass={inputClass("w-[50%]")}
                labelClass={labelClass()}
                name="password"
                placeholder="Password"
                type="password"
                {...props}
              />
              <Input
                errorContainer="div"
                inputClass={inputClass("w-[50%]")}
                labelClass={labelClass()}
                name="password_verify"
                placeholder="Confirm Password"
                type="password"
                {...props}
              />
              <Input
                errorContainer="div"
                inputClass={inputClass("w-[40%]")}
                labelClass={labelClass()}
                name="phone"
                placeholder="Phone Number"
                type="phone"
                {...props}
              />
              <Input
                errorContainer="div"
                inputClass={inputClass("w-[90%]")}
                labelClass={labelClass()}
                name="address"
                placeholder="Home Address"
                {...props}
              />

              <button type="submit" className="bg-blue-200 w-2/6 text-black">
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-2 pl-8">
          <span>Already have an account? </span>
          <Link to="/users/login" className="link bg-slate-100">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
