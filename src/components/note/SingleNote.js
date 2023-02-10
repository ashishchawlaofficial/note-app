import { useState, useEffect } from "react";
import {
  Alert,
  Grid,
  Box,
  ActionIcon,
  Flex,
  Modal,
  Text,
  Button,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { contentShortner } from "../../utils/Functions";
import { BsPencil, BsTrash } from "react-icons/bs";
import { notifyOnSave } from "../../utils/Notifications";
import { useSelector } from "react-redux";

const SingleNote = ({ item, index, deleteNote }) => {
  const [opened, setOpened] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const theme = useMantineTheme();
  const { loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    if (loading !== "pending" && error) {
      notifyOnSave("error");
    }
    if (isDeleted && loading !== "pending" && !error) {
      notifyOnSave("success", "Note has been deleted successfully.");
      setIsDeleted(false);
    }
  }, [error, loading, isDeleted]);

  return (
    <>
      <Grid.Col key={index} span={3} sx={{ position: "relative" }}>
        <Alert
          title={item?.title}
          color={
            item?.category !== "Uncategorized"
              ? item?.category.toLowerCase()
              : "gray"
          }
          sx={{ minHeight: "150px" }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: contentShortner(item?.content, 150),
            }}
          />
          <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
            <Flex>
              <ActionIcon
                color={
                  item?.category !== "Uncategorized"
                    ? item?.category.toLowerCase()
                    : "gray"
                }
              >
                <BsPencil size={18} />
              </ActionIcon>
              <ActionIcon
                color={
                  item?.category !== "Uncategorized"
                    ? item?.category.toLowerCase()
                    : "gray"
                }
                onClick={() => setOpened(true)}
              >
                <BsTrash size={18} />
              </ActionIcon>
            </Flex>
          </Box>
        </Alert>
      </Grid.Col>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        closeOnClickOutside={false}
        padding="lg"
        size={350}
        overlayColor={theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <Title order={3} ta="center" mb={20}>
          Are you sure?
        </Title>
        <Text c="dimmed" ta="center" fz="sm" w="250px" m="auto">
          This action is irreversible. You will not be able to undo this action.
        </Text>
        <Flex mt={20} justify="center">
          <Button
            variant="light"
            color="blue"
            onClick={() => setOpened(false)}
            mr={10}
          >
            Cancel
          </Button>
          <Button
            variant="light"
            color="red"
            onClick={() => {
              deleteNote(item.id);
              setOpened(false);
              setIsDeleted(true);
            }}
          >
            Delete
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default SingleNote;
