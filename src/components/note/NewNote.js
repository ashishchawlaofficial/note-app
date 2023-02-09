// import { useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { useDispatch } from "react-redux";
import { TextInput, Button, Stack, Box, Text } from "@mantine/core";

import { noteSchema } from "../../utils/YupSchema";
import TextEditor from "../common/TextEditor";
import { isEmptyObj } from "../../utils/Functions";
import { postData, getData } from "../../store/slices/noteSlice";

const NewNote = () => {
  const dispatch = useDispatch();
  const userID = sessionStorage.getItem("userId");

  // useForm hook to store the form field values
  const form = useForm({
    validate: yupResolver(noteSchema),

    initialValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  const handleSubmit = (values) => {
    console.log(values, form.values.category);
    console.log(isEmptyObj(values));
    if (!isEmptyObj(values)) dispatch(postData(values, userID));
  };

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
              content={form.values.content}
              name="content"
            />
          </Stack>
          <TextInput
            label="Category"
            placeholder="Add a cotegory (only 1)"
            {...form.getInputProps("category")}
          />
        </Stack>
        <Button color="indigo" type="submit" mt={20}>
          Save
        </Button>
      </form>
    </Box>
  );
};

export default NewNote;
