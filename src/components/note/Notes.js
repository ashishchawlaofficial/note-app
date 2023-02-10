import { forwardRef, useEffect, useState } from "react";
// prettier-ignore
import { Box, Title, Button, Divider, Stack, Grid, Group, ActionIcon, Flex, MultiSelect, Text } from "@mantine/core";
import { BsFillPlusCircleFill, BsFillCircleFill } from "react-icons/bs";
import SingleNote from "./SingleNote";
import { useDispatch } from "react-redux";
import { deleteNote } from "../../store/slices/noteSlice";

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

const Notes = ({ notes, handleSideSheet, userID, accessToken }) => {
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState(notes);
  const dispatch = useDispatch();

  const SelectItem = forwardRef(({ icon, value, color, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <ActionIcon color={color}>{icon}</ActionIcon>

        <Text size="sm">{value}</Text>
      </Group>
    </div>
  ));

  useEffect(() => {
    const filteredNotes = notes.filter((item) =>
      filter.find((val) => item.category === val.value)
    );
    if (filter.length !== 0) {
      setData(filteredNotes);
    } else {
      setData(notes);
    }
  }, [filter, notes]);

  const handleDelete = (id) => {
    dispatch(deleteNote(id, userID, accessToken));
  };

  // const handleEdit = (id) => {};

  return (
    <Box mt={30}>
      <Stack>
        <Box>
          <Group position="apart">
            <Title order={3}>Notes</Title>
            <Flex align="center">
              <Box mr={10}>
                <MultiSelect
                  data={categories}
                  placeholder="Filter by categories"
                  itemComponent={SelectItem}
                  searchable
                  clearable
                  nothingFound="Nobody here"
                  name="filterByCat"
                  onChange={(values) => {
                    setFilter(
                      values.map((value) =>
                        categories.find((item) => item.value === value)
                      )
                    );
                  }}
                />
              </Box>

              <Button
                variant="light"
                leftIcon={<BsFillPlusCircleFill />}
                onClick={() => handleSideSheet(true)}
              >
                Add New
              </Button>
            </Flex>
          </Group>
          <Divider my="xs" />
        </Box>
        <Box>
          <Grid>
            {data &&
              data.map((item, index) => (
                <SingleNote
                  key={index}
                  item={item}
                  index={index}
                  deleteNote={handleDelete}
                />
              ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default Notes;
