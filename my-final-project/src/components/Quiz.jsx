import { useEffect, useState } from "react";
import axios from "axios";
import he from "he";

function Quiz() {
    const [question, setQuestion] = useState(null);
    const [selected, setSelected] = useState("");
    const [result, setResult] = useState("");

    useEffect(() => {
        fetchQuestion();
    }, []);

    const fetchQuestion = async () => {
        try {
            const res = await axios.get(
                "https://opentdb.com/api.php?amount=1&type=multiple"
            );
            const data = res.data.results[0];
            const answers = [...data.incorrect_answers, data.correct_answer];
            const shuffled = answers.sort(() => Math.random() - 0.5);

            setQuestion({
                question: data.question,
                correct: data.correct_answer,
                answers: shuffled,
            });

            setSelected("");
            setResult("");
        } catch (err) {
            console.error("Не вдалося завантажити питання", err);
        }
    };

    const handleAnswer = (answer) => {
        setSelected(answer);
        setResult(answer === question.correct ? " Правильно!" : " Неправильно");
    };

    return (
        <div className="container my-5" style={{ maxWidth: "600px" }}>
            <h4 className="mb-4 text-primary">Вікторина</h4>
            <p className="mb-3 fw-bold">{he.decode(question.question)}</p>

            <div className="list-group">
                {question.answers.map((a, idx) => (
                    <button
                        key={idx}
                        className={`list-group-item list-group-item-action ${
                            selected
                                ? a === question.correct
                                    ? "list-group-item-success"
                                    : a === selected
                                        ? "list-group-item-danger"
                                        : ""
                                : ""
                        }`}
                        onClick={() => handleAnswer(a)}
                        disabled={!!selected}
                    >
                        {he.decode(a)}
                    </button>
                ))}
            </div>

            {result && (
                <div className="alert mt-4 fw-semibold text-center alert-light border">
                    {result}
                </div>
            )}

            {selected && (
                <button className="btn btn-secondary mt-3" onClick={fetchQuestion}>
                    Наступне питання
                </button>
            )}
        </div>
    );
}

export default Quiz;
