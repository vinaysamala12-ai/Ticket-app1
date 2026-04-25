import { useState, useEffect } from 'react'
import TicketCard from '../components/TicketCard'

function Dashboard() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState("All")

    // Fetch all tickets when page loads
    useEffect(() => {
        fetchTickets()
    }, [])

    async function fetchTickets() {
        try {
            const response = await fetch('https://ticket-app-backend-th4r.onrender.com/api/tickets')
            const data = await response.json()
            setTickets(data)
            setLoading(false)
        } catch (err) {
            setError("Failed to load tickets. Is your backend running?")
            setLoading(false)
        }
    }

    // Delete a ticket
    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this ticket?")) return

        try {
            await fetch(`https://ticket-app-backend-th4r.onrender.com/api/tickets/${id}`, {
                method: 'DELETE'
            })
            // Remove from state without refetching
            setTickets(tickets.filter(t => t._id !== id))
        } catch (err) {
            alert("Failed to delete ticket")
        }
    }

    // Update ticket status
    async function handleStatusChange(id, newStatus) {
        try {
            const response = await fetch(`https://ticket-app-backend-th4r.onrender.com/api/tickets/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })
            const updatedTicket = await response.json()

            // Update just that one ticket in state
            setTickets(tickets.map(t => t._id === id ? updatedTicket : t))
        } catch (err) {
            alert("Failed to update ticket")
        }
    }

    // Filter tickets by status
    const filteredTickets = filter === "All"
        ? tickets
        : tickets.filter(t => t.status === filter)

    if (loading) return <p style={{ padding: "20px" }}>⏳ Loading tickets...</p>
    if (error) return <p style={{ padding: "20px", color: "red" }}>❌ {error}</p>

    return (
        <div>

            {/* Stats Bar */}
            <div style={{
                display: "flex",
                gap: "16px",
                marginBottom: "24px",
                marginTop: "20px"
            }}>
                {["All", "Open", "In Progress", "Closed"].map(s => (
                    <div
                        key={s}
                        onClick={() => setFilter(s)}
                        style={{
                            background: filter === s ? "#2c3e50" : "white",
                            color: filter === s ? "white" : "#333",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            border: "1px solid #ddd",
                            fontWeight: "bold"
                        }}
                    >
                        {s} ({s === "All"
                            ? tickets.length
                            : tickets.filter(t => t.status === s).length})
                    </div>
                ))}
            </div>

            {/* Ticket List */}
            {filteredTickets.length === 0
                ? <p>No tickets found. <a href="/create">Create one!</a></p>
                : filteredTickets.map(ticket => (
                    <TicketCard
                        key={ticket._id}
                        ticket={ticket}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                    />
                ))
            }

        </div>
    )
}

export default Dashboard