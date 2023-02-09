import { Box, Image, Title, Text, Button } from "@mantine/core";
import EmptyImg from "../../assets/img/empty_notes.svg";
import { FiPlus } from "react-icons/fi";

const EmptyDashboard = ({ handleSideSheet }) => {
  return (
    <Box
      component="section"
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Box
          sx={{
            maxWidth: 250,
          }}
          mx="auto"
        >
          <Image src={EmptyImg} alt="Empty Image" />
        </Box>
        <Title order={6} mt={30}>
          No Notes Found.
        </Title>
        <Text fz="sm" c="dimmed">
          Looks like you have just started! Click + to a new note.
        </Text>
        <Button
          variant="light"
          leftIcon={<FiPlus />}
          mt={20}
          onClick={handleSideSheet}
          // loading={isLoading === "pending"}
        >
          Create New
        </Button>
      </Box>
    </Box>
  );
};

export default EmptyDashboard;
