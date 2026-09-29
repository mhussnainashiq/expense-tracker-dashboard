function StatCard({ title, value, icon, change }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span>{title}</span>
        {icon}
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-change">{change}</div>
    </div>
  );
}

export default StatCard;