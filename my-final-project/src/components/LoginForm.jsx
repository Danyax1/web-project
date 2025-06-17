import { useState } from "react";

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Валідація
        if (!username.trim() || !password.trim()) {
            setError("Заповни поля");
            return;
        }

        // Простий захист (тільки дозволені символи)
        const regex = /^[a-zA-Z0-9_@.-]{3,}$/;
        if (!regex.test(username) || !regex.test(password)) {
            setError("Недопустимі символи в логіні або паролі");
            return;
        }

        // Імітація успішного входу
        if (username === "admin" && password === "1234") {
            setError("");
            onLogin(username);
        } else {
            setError("Невірний логін або пароль");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h3 className="text-center mb-4">Вхід</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Логін</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Введіть логін"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Пароль</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введіть пароль"
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100">
                    Увійти
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
