import React from 'react';
import './Board.css';
import TicketCard from './TicketCard';
import { Icons } from './Icons';

const Board = ({ tickets, users, grouping, sorting }) => {
  const getPriorityInfo = (priority) => {
    const priorityMap = {
      4: { label: 'Urgent', icon: <Icons.Urgent /> },
      3: { label: 'High', icon: <Icons.High /> },
      2: { label: 'Medium', icon: <Icons.Medium /> },
      1: { label: 'Low', icon: <Icons.Low /> },
      0: { label: 'No priority', icon: <Icons.NoPriority /> }
    };
    return priorityMap[priority] || priorityMap[0];
  };

  const getStatusIcon = (status) => {
    const statusMap = {
      'Todo': <Icons.Todo />,
      'In progress': <Icons.InProgress />,
      'Backlog': <Icons.Backlog />,
      'Done': <Icons.Done />,
      'Canceled': <Icons.Canceled />,
      'Urgent': <Icons.Urgent1/>,
      'High': <Icons.High/>,
      'Medium': <Icons.Medium/>,
      'Low': <Icons.Low/>,
      'No priority': <Icons.NoPriority/>,
    };
    return statusMap[status] || null;
  };

  const groupTickets = () => {
    let grouped = {};

    if (grouping === 'status') {
      grouped = {
        'Backlog': [],
        'Todo': [],
        'In progress': [],
        'Done': [],
        'Canceled': []
      };
      tickets.forEach(ticket => {
        grouped[ticket.status].push(ticket);
      });
    } else if (grouping === 'user') {
      users.forEach(user => {
        grouped[user.name] = [];
      });
      tickets.forEach(ticket => {
        const user = users.find(u => u.id === ticket.userId);
        if (user) {
          grouped[user.name].push(ticket);
        }
      });
    } else if (grouping === 'priority') {
      grouped = {
        'Urgent': [],
        'High': [],
        'Medium': [],
        'Low': [],
        'No priority': []
      };
      tickets.forEach(ticket => {
        const { label } = getPriorityInfo(ticket.priority);
        grouped[label].push(ticket);
      });
    }

    // Sort tickets within each group
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return grouped;
  };

  const getGroupIcon = (group, grouping) => {
    if (grouping === 'status') {
      return getStatusIcon(group);
    } else if (grouping === 'priority') {
      return getStatusIcon(group);
    }
    return null;
  };

  const groupedTickets = groupTickets();

  return (
    <div className="board">
      {Object.entries(groupedTickets).map(([group, groupTickets]) => (
        <div key={group} className="column">
          <div className="column-header">
            <div className="group-info">
              {getGroupIcon(group, grouping)}
              <h2>{group}</h2>
              <span className="ticket-count">{groupTickets.length}</span>
            </div>
            <div className="column-actions">
              <button className="icon-button"><Icons.Plus /></button>
              <button className="icon-button"><Icons.Options /></button>
            </div>
          </div>
          <div className="ticket-list">
            {groupTickets.map(ticket => (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket}
                user={users.find(u => u.id === ticket.userId)}
                priorityInfo={getPriorityInfo(ticket.priority)}
                statusIcon={getStatusIcon(ticket.status)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;