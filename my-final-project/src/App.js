import { useState } from "react";
import LoginForm from "./components/LoginForm";
import ItemList from "./components/ItemList";

function App() {
    const [user, setUser] = useState(null);

    return (
        <div>
            <header className="bg-dark text-white text-center py-4 mb-4">
                <h1>Фінальний веб-проєкт</h1>
            </header>

            {user ? (
                <div className="container">
                    <p className="text-end">Have a nice day, {user}!</p>
                    <ItemList />
                </div>
            ) : (
                <LoginForm onLogin={setUser} />
            )}
        </div>
    );
}

export default App;
