import { toast } from 'react-toastify';

export const showToast = (type = "success", msg, autoClose = 5000, className) => {
  const defaultClass = type === "success" ? "primaryColor" : "dangerColor";
  const appliedClassName = className || defaultClass;
  const appliedAutoClose = autoClose || 5000;

  if (type === "success") {
    toast.success(msg, {
      autoClose: appliedAutoClose,
      className: appliedClassName,
    });
  } else if (type === "error") {
    toast.error(msg, {
      autoClose: appliedAutoClose,
      className: appliedClassName,
    });
  }
};
