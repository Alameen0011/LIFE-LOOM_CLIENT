import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";


function App() {


  return (
    <div>
      <ToastContainer 
        position="bottom-right"  // Default position for all toasts
        autoClose={5000}      // Auto-close after 5 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false}   // Show newest toast at the top
        closeOnClick          // Close the toast when clicked
        rtl={false}           // Right-to-left layout for languages like Arabic
        pauseOnFocusLoss      // Pause the toast when the window loses focus
        draggable             // Allow the toast to be draggable
        pauseOnHover          // Pause the toast when hovered
      
      
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
