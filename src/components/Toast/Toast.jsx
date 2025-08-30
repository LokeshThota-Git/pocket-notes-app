import { useEffect } from "react";
import { toast } from "react-toastify";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa"; // icons for success/warning

function Toast({ message, type = "info", duration = 1800, onDone }) {
  useEffect(() => {
    if (!message) return;
    let options = {
      autoClose: duration,
      onClose: () => onDone?.(),
    };

    if (type === "success") {
      options = {
        ...options,
        className: "toast-success",
        icon: <FaCheckCircle style={{ color: "#fff" }} />, // white icon
      };
      toast.success(message, options);
    } else if (type === "warning" || type === "warn") {
      options = {
        ...options,
        className: "toast-warning",
        icon: <FaExclamationTriangle style={{ color: "#fff" }} />,
      };
      toast.warn(message, options);
    } else {
      toast(message, options);
    }
    // Cleanup handled by toastify
  }, [message, type, duration, onDone]);

  return null;
}
export default Toast;
