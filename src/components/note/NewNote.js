import { forwardRef, useEffect, useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
// prettier-ignore
import { TextInput, Button, Stack, Box, Text, Select, Group, ActionIcon } from "@mantine/core";
import { noteSchema } from "../../utils/YupSchema";
import TextEditor from "../common/TextEditor";
import { isEmptyObj } from "../../utils/Functions";
import { postData, getData } from "../../store/slices/noteSlice";
import { BsFillCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { notifyOnSave } from "../../utils/Notifications";

// Categories data for select
const categories = [
  {
    value: "Uncategorized",
    label: "Uncategorized",
    icon: <BsFillCircleFill />,
    color: "gray",
  },
  { value: "Blue", label: "Blue", icon: <BsFillCircleFill />, color: "blue" },
  {
    value: "Green",
    label: "Green",
    icon: <BsFillCircleFill />,
    color: "green",
  },
  { value: "Red", label: "Red", icon: <BsFillCircleFill />, color: "red" },
  {
    value: "Orange",
    label: "Orange",
    icon: <BsFillCircleFill />,
    color: "orange",
  },
];

const NewNote = ({ handleSideSheet }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const userID = sessionStorage.getItem("userId");
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.notes);

  // useForm hook to store the form field values
  const form = useForm({
    validate: yupResolver(noteSchema),

    initialValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  const SelectItem = forwardRef(({ icon, value, color, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <ActionIcon color={color}>{icon}</ActionIcon>

        <Text size="sm">{value}</Text>
      </Group>
    </div>
  ));

  const handleSubmit = (values) => {
    console.log(values, form.values.category);
    console.log(isEmptyObj(values));
    if (!isEmptyObj(values)) {
      dispatch(postData(values, userID, user.accessToken));
      setIsSubmitted(true);
      handleSideSheet(false);
      form.reset();
    }
  };

  useEffect(() => {
    if (loading !== "pending" && error) {
      notifyOnSave("error");
    }
    if (isSubmitted && loading !== "pending" && !error) {
      notifyOnSave("success", "Note has been saved successfully.");
      setIsSubmitted(false);
    }
  }, [error, loading, isSubmitted]);

  useEffect(() => {
    user?.accessToken && dispatch(getData(user.uid, user.accessToken));
  }, [user.uid, user.accessToken, dispatch, user]);

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="Enter the title of the note"
            {...form.getInputProps("title")}
          />
          <Stack spacing="xs">
            <Text fz="sm" fw={500}>
              Note Body
            </Text>
            <TextEditor
              placeholder="Enter some text"
              onChange={form.setValues}
              content={form.values?.content}
              name="content"
            />
          </Stack>
          <Select
            withAsterisk
            label="Category"
            placeholder="Select Category"
            searchable
            nothingFound="Category not found"
            data={categories}
            itemComponent={SelectItem}
            filter={(value, item) =>
              item.label.toLowerCase().includes(value.toLowerCase().trim())
            }
            {...form.getInputProps("category")}
            defaultValue={categories[0].value}
          />
        </Stack>
        <Button
          color="indigo"
          type="submit"
          mt={20}
          leftIcon={<BsFillArrowRightCircleFill />}
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default NewNote;
