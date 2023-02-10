import {
  Box,
  Header,
  Group,
  Title,
  Avatar,
  Text,
  UnstyledButton,
  Menu,
  Container,
} from "@mantine/core";
import { signOutUser } from "../../store/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { SlUser, SlSettings, SlLogout } from "react-icons/sl";
import { avatarName } from "../../utils/Functions";

const AppHeader = () => {
  const dispatch = useDispatch();
  const { displayName, email } = useSelector((state) => state.auth?.user);

  const handleLogOut = () => {
    dispatch(signOutUser());
  };

  const avatar = displayName && avatarName(displayName);

  return (
    <Box>
      <Header height={60} px="md">
        <Container size="xl" mt={15}>
          <Group position="apart" sx={{ height: "100%" }}>
            <Title order={1} size="h3">
              Note App
            </Title>
            <Menu width={300}>
              <Menu.Target>
                <UnstyledButton>
                  <Group>
                    <Avatar size={40} color="blue">
                      {avatar}
                    </Avatar>
                    <div>
                      <Text>{displayName}</Text>
                      <Text size="xs" color="dimmed">
                        {email}
                      </Text>
                    </div>
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<SlUser />}>Profile</Menu.Item>
                <Menu.Item icon={<SlSettings />}>Settings</Menu.Item>
                <Menu.Item
                  onClick={handleLogOut}
                  icon={<SlLogout />}
                  color="red"
                >
                  Sign Out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
      </Header>
    </Box>
  );
};

export default AppHeader;
