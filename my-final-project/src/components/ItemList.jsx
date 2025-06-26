import { useEffect, useState } from "react";
import axios from "axios";
import "./ItemList.css";

function ItemList() {
    const [items, setItems] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchItems();
        const interval = setInterval(fetchItems, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchItems = async () => {
        try {
            const res = await axios.get("http://localhost:3001/items");
            setItems(res.data);
        } catch (err) {
            console.error("Помилка при отриманні даних:", err);
        }
    };

    const toggleDetails = (id) => {
        setSelectedId(selectedId === id ? null : id);
    };

    return (
        <div className="container">
            <h3 className="mb-4">Animals</h3>
            {items.map((item) => (
                <div key={item.id} className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.shortDescription}</p>
                        <button
                            onClick={() => toggleDetails(item.id)}
                            className="btn btn-outline-primary btn-sm"
                        >
                            {selectedId === item.id ? "Hide" : "Details"}
                        </button>

                        <div className={`details-container ${selectedId === item.id ? "open" : ""}`}>
                            {selectedId === item.id && (
                                <div className="details-content mt-3">
                                    <p>{item.fullDescription}</p>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="img-fluid rounded"
                                        style={{ maxHeight: "250px" }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ItemList;
