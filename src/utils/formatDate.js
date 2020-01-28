import moment from "moment";
import "moment/locale/id";

moment.locale("id");

const formatDate = (date, format = "D MMM YYYY") => {
  return moment(date).format(format);
};

export default formatDate;
