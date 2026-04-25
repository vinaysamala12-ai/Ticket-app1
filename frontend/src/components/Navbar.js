import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav style={{
            background: "#2c3e50",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <h2 style={{ color: "white" }}>🎫 TicketDesk</h2>
            <div>
                <Link to="/" style={{
                    color: "white",
                    marginRight: "20px",
                    textDecoration: "none",
                    fontWeight: "bold"
                }}>
                    Dashboard
                </Link>
                <Link to="/create" style={{
                    background: "#3498db",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: "bold"
                }}>
                    + New Ticket
                </Link>
            </div>
        </nav>
    )
}

export default Navbar