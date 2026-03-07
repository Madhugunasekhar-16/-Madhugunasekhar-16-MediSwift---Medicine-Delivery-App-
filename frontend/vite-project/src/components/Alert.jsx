const Alert = ({ type = "success", message }) => {
  if (!message) return null;

  const baseStyle = "px-4 py-2 rounded mb-4 text-sm";

  const typeStyles = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type]}`}>
      {message}
    </div>
  );
};

export default Alert;