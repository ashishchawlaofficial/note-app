import { showNotification } from "@mantine/notifications";
import { v4 as uuidv4 } from "uuid";
import { BsCheck2, BsX } from "react-icons/bs";

// Show Success / Error Notifications
export const notifyOnSave = (identifier = "success", msg = null) => {
  const chunk =
    identifier === "success"
      ? {
          title: "😎 Blazing Fast!",
          msg: msg !== null ? msg : "Details have been saved successfully",
          icon: <BsCheck2 />,
          color: "lime",
        }
      : {
          title: "🤯 Oops!",
          msg:
            msg !== null
              ? msg
              : "Some error has ocurred. Please try again in sometime.",
          icon: <BsX />,
          color: "red",
        };

  return showNotification({
    id: uuidv4(),
    title: chunk.title,
    message: chunk.msg,
    autoClose: 5000,
    icon: chunk.icon,
    color: chunk.color,
  });
};
