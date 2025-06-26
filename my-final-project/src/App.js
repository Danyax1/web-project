import { useState } from "react";
import LoginForm from "./components/LoginForm";
import ItemList from "./components/ItemList";
import Quiz from "./components/Quiz";

function App() {
    const [user, setUser] = useState(null);

    return (
        <div>
            <header className="bg-dark text-white text-center py-4 mb-4">
                <h1>Final Web Project</h1>
            </header>

            {user ? (
                <>
                    <div className="container">
                        <p className="text-end">Welcome, {user}!</p>
                        <ItemList />
                        <hr className="my-5" />
                        <Quiz />
                    </div>
                </>
            ) : (
                <LoginForm onLogin={setUser} />
            )}
        </div>
    );
}

export default App;

