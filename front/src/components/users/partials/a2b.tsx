import { useLazyQuery } from "@apollo/client";
import { gql } from "../../../__generated__";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Input from "../../lib/inputs";
import { FileLockIcon } from "lucide-react";
import { useSession } from "../../lib/session";

const initialValues: any = {
  kode: "",
};
const KodeSchema = yup.object({
  kode: yup.string().required("access code is required"),
});

const SESSION_KODE = gql(`
  query VerifyKode($kode: String!, $id: String!) {
    verifyKode(kode: $kode, id: $id) {
        id
        surname
        firstname
        lastname
        phone
        address
        active
        username
        photo_url
        createdAt
        dept {
            id
            name
        }
    }
    }
`);

const A2b = () => {
  const session = useSession();
  const [post, { data }] = useLazyQuery(SESSION_KODE);

  const handleSubmit = async (values: any) => {
    post({
      variables: {
        kode: values.kode,
        id: session?.id || "",
      },
    }),
      console.log(data);
  };

  const inputClass = (width: string) => `primary peer ${width}`;
  const labelClass = () =>
    "primary peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1";

  return (
    <div className="flex flex-col flex-1 justify-start items-center bg-gradient-to-tr from-transparent via-transparent to-blue-100 py-4">
      <FileLockIcon className="w-32 h-32 mb-4 border-8 bg-blue-200 p-4 rounded-full" />
      <div className="px-8 pb-2 text-center text-md font-bold">
        Please enter the access code given to you for today
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={KodeSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="flex flex-col items-center form">
            <Input
              errorContainer="div"
              inputClass={inputClass("w-[90%]")}
              labelClass={labelClass()}
              name="kode"
              placeholder="Aceess Code"
              {...props}
            />
            <button type="submit" className="bg-blue-200 text-black">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default A2b;
