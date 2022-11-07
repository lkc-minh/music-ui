import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./components/GlobalStyle/GlobalStyle";
import { AuthContextProvider } from "./contexts/authContext";
import { AppProvider } from "./contexts/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <AppProvider>
                <GlobalStyle>
                    <App />
                </GlobalStyle>
            </AppProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
