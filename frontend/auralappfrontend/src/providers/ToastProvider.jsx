import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      toastOptions={{
        style: {
          borderRadius: "4px",
          fontSize: "18px",
          padding: "10px",
        },
        duration: 1000,
        error: {
          duration: 2500,
        },
      }}
    />
  );
}
