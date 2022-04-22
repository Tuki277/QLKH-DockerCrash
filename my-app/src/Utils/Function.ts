import moment from "moment";

export const formatDateTime = (date?: Date) =>
  moment(date).format("DD-MM-YYYY HH:mm:ss");

export const processStatus = (status: string) => {
  var statusContent = {
      content: "",
      css: ""
  };
  if (status === "New") {
    statusContent = {
        content: "Chưa giao",
        css: "text-black"
    }
  } else if (status === "Delivered") {
    statusContent = {
        content: "Đang giao",
        css: "text-yellow-600"
    }
  } else if (status === "Finish") {
    statusContent = {
        content: "Giao thành công",
        css: "text-green-600"
    }
  } else {
    statusContent = {
        content: "Giao thất bại",
        css: "text-red-600"
    }
  }
  return statusContent;
};