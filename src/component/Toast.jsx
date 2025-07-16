export default function Toast({ message, type = "success", duration = 3000 }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white
            ${type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {message}
        </div>
    );
}
