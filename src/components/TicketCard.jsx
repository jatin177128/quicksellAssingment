import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket, user, priorityInfo, statusIcon }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && (
          <div className={`user-avatar ${user.available ? 'available' : 'unavailable'}`}>
            {user.name[0].toUpperCase()}
            <span className="availability-indicator"></span>
          </div>
        )}
      </div>
      <div className="ticket-title">
        {statusIcon}
        <h3>{ticket.title}</h3>
      </div>
      <div className="ticket-tags">
        {priorityInfo?.icon}
        {ticket.tag.map((tag, index) => (
          <span key={index} className="feature-tag">
            ◆ {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TicketCard;