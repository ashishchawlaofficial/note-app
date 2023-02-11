import { useEffect, useState } from "react";
import { Container, Drawer, useMantineTheme, ScrollArea } from "@mantine/core";
import Layout from "../Layout/Layout";
import Empty from "../common/Empty";
import NewNote from "../note/NewNote";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../store/slices/noteSlice";
import { isEmptyArray } from "../../utils/Functions";
import Notes from "../note/Notes";

const Home = () => {
  const [opened, setOpened] = useState(false);
  const [selectedNote, setSelectedNote] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [noteID, setNoteID] = useState(null);
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data, loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    user?.accessToken && dispatch(getData(user.uid, user.accessToken));
  }, [user.uid, user.accessToken, dispatch, user, editFlag]);

  const handleEdit = (id) => {
    const note = data.filter((item) => item.id === id);
    setSelectedNote(note);
    setEditFlag(true);
    setOpened(true);
    setNoteID(id);
  };

  console.log(data, loading, error);

  return (
    <Layout>
      <Container size="xl">
        {isEmptyArray(data) ? (
          <Empty handleSideSheet={setOpened} />
        ) : (
          <Notes
            notes={data}
            handleSideSheet={setOpened}
            userID={user.uid}
            accessToken={user.accessToken}
            editNote={handleEdit}
          />
        )}
      </Container>
      <Drawer
        overlayColor={theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        title="New Note"
        padding="xl"
        size="40%"
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        lockScroll={false}
      >
        <ScrollArea.Autosize
          maxHeight={"90vh"}
          sx={{ maxWidth: "100%" }}
          mx="auto"
        >
          <NewNote
            handleSideSheet={setOpened}
            editNote={handleEdit}
            selectedNote={selectedNote}
            shouldEdit={editFlag}
            setShouldEdit={setEditFlag}
            noteID={noteID}
            setSelectedNote={setSelectedNote}
          />
        </ScrollArea.Autosize>
      </Drawer>
    </Layout>
  );
};

export default Home;
