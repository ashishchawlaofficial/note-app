import * as Yup from "yup";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm, yupResolver } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  Box,
} from "@mantine/core";
// import { IoLogoGoogle, IoLogoGithub } from "react-icons/io";
import { signInUser, signUpUser } from "../../store/slices/AuthSlice";

// Yup Login Schema
const loginSchema = Yup.object().shape(
  {
    name: Yup.string().when("isRegister", {
      is: true,
      then: (rule) =>
        rule
          .min(2, "Name should have atleast 2 characters")
          .required("Name is required"),
    }),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be of minimum 6 characters")
      .required("Password is required"),
    isRegister: Yup.boolean(),
  },
  ["isRegister", "isRegister"]
);

// Auth Component
const Auth = (props) => {
  // useToggle hook to toggle the form
  const [type, toggle] = useToggle(["login", "register"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const { user, error } = useSelector((state) => state.auth);

  // useForm hook to store the form field values
  const form = useForm({
    validate: yupResolver(loginSchema),

    initialValues: {
      email: "",
      name: "",
      password: "",
      isRegister: false,
    },
  });

  // Toggle Handler
  const handleToggle = () => {
    toggle();
    form.setValues({
      isRegister: !form.values.isRegister,
    });
  };

  // Submit Handler Method
  const handleSubmit = (values) => {
    const name = values?.name;
    const email = values?.email;
    const password = values?.password;

    if (values?.isRegister) {
      dispatch(signUpUser(name, email, password));
    } else {
      dispatch(signInUser(email, password));
    }
    // IMP: should change this to return redirect in future
    if (location.state?.from) navigate(location.state.from);
    else navigate("/");
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#E6E8F0",
      }}
    >
      <Box component="section" sx={{ width: "400px" }}>
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="lg" weight={500} mb={20}>
            Welcome to Note App, {type}
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              {type === "register" && (
                <TextInput
                  withAsterisk
                  label="Name"
                  placeholder="Your name"
                  {...form.getInputProps("name")}
                />
              )}

              <TextInput
                withAsterisk
                label="Email"
                placeholder="hello@domain.com"
                {...form.getInputProps("email")}
              />

              <PasswordInput
                withAsterisk
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
              />
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={handleToggle}
                size="xs"
              >
                {type === "register"
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit" color="dark">
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Auth;
