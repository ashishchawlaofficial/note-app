import { useState } from "react";
import { Drawer, useMantineTheme } from "@mantine/core";
import Layout from "../Layout/Layout";
import Empty from "../common/Empty";

const Home = () => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <Layout>
      <Empty handleSideSheet={setOpened} />
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
        {/* Drawer content */}
      </Drawer>
    </Layout>
  );
};

export default Home;
