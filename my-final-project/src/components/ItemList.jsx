
import { useEffect, useState } from "react";
import axios from "axios";

function ItemList() {
    const [items, setItems] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);

    useEffect(() => {
        fetchItems();
        const interval = setInterval(fetchItems, 30000); // AJAX оновлення
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

    return (
        <div className="container mt-4">
            <div className="row">
                {items.map((item) => (
                    <div className="col-md-6 mb-4" key={item.id}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        setExpandedItem(expandedItem === item.id ? null : item.id)
                                    }
                                >
                                    {expandedItem === item.id ? "Сховати" : "Детальніше"}
                                </button>
                                {expandedItem === item.id && (
                                    <div className="mt-3 text-muted">{item.details}</div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemList;
