import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Toast from "./utils/Toast.jsx";
import  './main.css'
import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
<>
<Toast/>
<ErrorBoundary fallback={<ErrorPage/>}>

<App />
</ErrorBoundary>
</>
);
