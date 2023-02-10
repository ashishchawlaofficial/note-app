import { useEffect, useState } from "react";
import { Container, Drawer, useMantineTheme } from "@mantine/core";
import Layout from "../Layout/Layout";
import Empty from "../common/Empty";
import NewNote from "../note/NewNote";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../store/slices/noteSlice";
import { isEmptyArray } from "../../utils/Functions";
import Notes from "../note/Notes";

const Home = () => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data, loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    user?.accessToken && dispatch(getData(user.uid, user.accessToken));
  }, [user.uid, user.accessToken, dispatch, user]);

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
      >
        <NewNote handleSideSheet={setOpened} />
      </Drawer>
    </Layout>
  );
};

export default Home;
