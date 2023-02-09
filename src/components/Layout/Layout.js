import { Box } from "@mantine/core";
import AppHeader from "./Header";

const Layout = ({ children }) => {
  return (
    <Box component="main">
      <AppHeader />
      {children}
    </Box>
  );
};

export default Layout;
