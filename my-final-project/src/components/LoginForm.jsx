import { useState } from "react";

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError("Empty fields");
            return;
        }

        const regex = /^[a-zA-Z0-9_@.-]{3,}$/;
        if (!regex.test(username) || !regex.test(password)) {
            setError("Bad symbols");
            return;
        }

        if (username === "admin" && password === "1234") {
            setError("");
            onLogin(username);
        } else {
            setError("Wrong password or login");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h3 className="text-center mb-4">Вхід</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Login</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter login"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100">
                    Sigh in
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
