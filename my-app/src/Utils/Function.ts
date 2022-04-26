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

export const processTitle = (x?: number, id?: string) => {
  if (id === "") {
    return "thêm mới";
  } else {
    switch (x) {
      case 1:
        return "cập nhật";
      case 2:
        return "xóa"
      case 3:
        return "nhận vận chuyển"
      case 4:
        return "xác nhận vận chuyển thành công";
      case 5:
        return "xác nhận vận chuyển không thành công"
      default:
        break;
    }
  }
}