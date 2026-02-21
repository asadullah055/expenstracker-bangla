import { Toaster } from "react-hot-toast";
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes
} from "react-router-dom";
import UserProvider from "./context/userContext";
import { WorkspaceProvider } from "./context/WorkspaceContext";
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Expense from './pages/Dashboard/Expense';
import Home from './pages/Dashboard/Home';
import Income from "./pages/Dashboard/Income";
import Settings from "./pages/Dashboard/Settings";


const App = () => {
    return (
        <UserProvider>
            <WorkspaceProvider>
                <div>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Root />} />
                            <Route path="/login" exact element={<Login />} />
                            <Route path="/signup" exact element={<SignUp />} />
                            <Route path="/dashboard" exact element={<Home />} />
                            <Route path="/income" element={<Income />} />
                            <Route path="/expense" exact element={<Expense />} />
                            <Route path="/settings" exact element={<Settings />} />
                        </Routes>
                    </Router>
                </div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </WorkspaceProvider>
        </UserProvider>
    );
};
export default App;

const Root = () => {
    // check if token exists in local storage
    const inAuthenticated = !!localStorage.getItem('token');
    return inAuthenticated ? (
        <Navigate to="/dashboard" />
    ) : (
        <Navigate to="/login" />
    )

}