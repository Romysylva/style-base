import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./AdminDashboard.scss";

export default function AdminDashboard() {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const users = [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
    { name: "Charlie", email: "charlie@example.com" },
  ];

  useEffect(() => {
    const lineChart = new Chart(lineChartRef.current, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Visitors",
            data: [120, 200, 150, 220, 300, 280],
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,0.08)",
            fill: true,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });

    const barChart = new Chart(barChartRef.current, {
      type: "bar",
      data: {
        labels: ["Products", "Orders", "Sales"],
        datasets: [
          {
            label: "This month",
            data: [120, 90, 150],
            backgroundColor: ["#2563eb", "#10b981", "#f59e0b"],
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });

    return () => {
      lineChart.destroy();
      barChart.destroy();
    };
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <aside className={`sb-sidebar ${sidebarOpen ? "" : "hidden"}`}>
        <button
          className="sb-button mb-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          Toggle Sidebar
        </button>
        <nav className="sb-nav">
          <a href="#" className="active">
            Dashboard
          </a>
          <a href="#">Users</a>
          <a href="#">Orders</a>
        </nav>
      </aside>

      <main
        className="sb-main"
        style={{ marginLeft: sidebarOpen ? "220px" : "0" }}
      >
        <div className="sb-topbar">
          <div className="sb-topbar-inner">
            <h1>Admin Dashboard</h1>
          </div>
        </div>

        <div className="container stats-grid">
          <div className="stat">
            <div className="stat-title">Visitors</div>
            <div className="stat-value">300</div>
          </div>
          <div className="stat">
            <div className="stat-title">Orders</div>
            <div className="stat-value">150</div>
          </div>
          <div className="stat">
            <div className="stat-title">Sales</div>
            <div className="stat-value">$4,500</div>
          </div>
          <div className="stat">
            <div className="stat-title">Products</div>
            <div className="stat-value">120</div>
          </div>
        </div>

        <div className="container charts-grid mt-4">
          <canvas ref={lineChartRef} height={200}></canvas>
          <canvas ref={barChartRef} height={200}></canvas>
        </div>

        <div className="container mt-6">
          <input
            type="text"
            placeholder="Search users..."
            className="sb-input mb-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <table className="sb-table" id="usersTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
