function TicketCard({ ticket, onDelete, onStatusChange }) {

    // Color coding based on priority
    const priorityColors = {
        High: "#e74c3c",
        Medium: "#f39c12",
        Low: "#27ae60"
    }

    // Color coding based on status
    const statusColors = {
        Open: "#3498db",
        "In Progress": "#f39c12",
        Closed: "#95a5a6"
    }

    return (
        <div style={{
            background: "white",
            border: "1px solid #ddd",
            borderLeft: `5px solid ${priorityColors[ticket.priority]}`,
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "12px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
        }}>

            {/* Ticket Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "16px" }}>{ticket.title}</h3>
                <span style={{
                    background: statusColors[ticket.status],
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "12px"
                }}>
                    {ticket.status}
                </span>
            </div>

            {/* Ticket Details */}
            <div style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
                <span style={{
                    background: priorityColors[ticket.priority],
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    marginRight: "10px"
                }}>
                    {ticket.priority}
                </span>
                👤 {ticket.assignedTo}
            </div>

            {ticket.description && (
                <p style={{ marginTop: "8px", fontSize: "14px", color: "#555" }}>
                    {ticket.description}
                </p>
            )}

            {/* Action Buttons */}
            <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>

                {ticket.status !== "In Progress" && ticket.status !== "Closed" && (
                    <button
                        onClick={() => onStatusChange(ticket._id, "In Progress")}
                        style={{ background: "#f39c12", color: "white" }}
                    >
                        ▶ Start
                    </button>
                )}

                {ticket.status !== "Closed" && (
                    <button
                        onClick={() => onStatusChange(ticket._id, "Closed")}
                        style={{ background: "#27ae60", color: "white" }}
                    >
                        ✅ Close
                    </button>
                )}

                <button
                    onClick={() => onDelete(ticket._id)}
                    style={{ background: "#e74c3c", color: "white" }}
                >
                    🗑 Delete
                </button>

            </div>
        </div>
    )
}

export default TicketCard