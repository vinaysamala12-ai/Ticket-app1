import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateTicket() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Low",
        assignedTo: ""
    })

    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch('https://ticket-app-backend-th4r.onrender.com/api/tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                navigate('/')  // redirect to dashboard after creating
            } else {
                setError("Failed to create ticket. Please try again.")
            }
        } catch (err) {
            setError("Cannot connect to server. Is your backend running?")
        }

        setSubmitting(false)
    }

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginTop: "6px",
        marginBottom: "16px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        fontSize: "14px"
    }

    return (
        <div style={{
            background: "white",
            padding: "28px",
            borderRadius: "10px",
            maxWidth: "560px",
            margin: "30px auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
            <h2 style={{ marginBottom: "20px" }}>🎫 Create New Ticket</h2>

            {error && (
                <p style={{ color: "red", marginBottom: "16px" }}>❌ {error}</p>
            )}

            <form onSubmit={handleSubmit}>

                <label>Title *</label>
                <input
                    style={inputStyle}
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. App is crashing on login"
                    required
                />

                <label>Description</label>
                <textarea
                    style={{ ...inputStyle, height: "100px", resize: "vertical" }}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the issue in detail..."
                />

                <label>Priority</label>
                <select
                    style={inputStyle}
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option value="Low">🟢 Low</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="High">🔴 High</option>
                </select>

                <label>Assign To</label>
                <input
                    style={inputStyle}
                    type="text"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    placeholder="Agent name"
                />

                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                    <button
                        type="submit"
                        disabled={submitting}
                        style={{
                            background: "#2c3e50",
                            color: "white",
                            padding: "10px 24px",
                            borderRadius: "6px",
                            fontSize: "15px"
                        }}
                    >
                        {submitting ? "Creating..." : "✅ Create Ticket"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        style={{
                            background: "#eee",
                            color: "#333",
                            padding: "10px 24px",
                            borderRadius: "6px",
                            fontSize: "15px"
                        }}
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    )
}

export default CreateTicket