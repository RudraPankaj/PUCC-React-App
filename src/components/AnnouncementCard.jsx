import React from 'react';
import { Link } from 'react-router-dom';

function AnnouncementCard({ announcement, isExecutive, onEditClick, onDeleteClick }) {
  const { announcement: text, hexcolor, time, date, eventid } = announcement;

  const getGradient = (hex) => {
    if (!hex || hex === '#FFFFFF') hex = '#4a90e2';
    // Create a darker shade for the gradient
    const color = hex.substring(1); // remove #
    const rgb = parseInt(color, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const darkerR = Math.max(0, r - 40);
    const darkerG = Math.max(0, g - 40);
    const darkerB = Math.max(0, b - 40);
    const darkerHex = `#${((1 << 24) + (darkerR << 16) + (darkerG << 8) + darkerB).toString(16).slice(1)}`;
    return `linear-gradient(to right, ${hex}, ${darkerHex})`;
  }

  const cardStyle = {
    background: getGradient(hexcolor),
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    onEditClick(announcement);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    onDeleteClick(announcement);
  };

  return (
    <div style={cardStyle} className="rounded-lg shadow-lg p-4 relative group text-white">
      {isExecutive && (
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleEdit}
            className="bg-white/50 hover:bg-white/60 text-white p-2 rounded shadow-md transition-all"
            title="Edit announcement"
          >
            <i className="bi bi-pencil-fill text-sm" />
          </button>
          <button
            onClick={handleDelete}
            className="bg-white/50 hover:bg-white/60 text-white p-2 rounded shadow-md transition-all"
            title="Delete announcement"
          >
            <i className="bi bi-trash-fill text-sm" />
          </button>
        </div>
      )}
      <div className="flex items-start gap-4">
        <div>
          <i className="bi bi-megaphone-fill text-2xl" />
        </div>
        <div className="flex-1">
          <p className="font-medium" style={{ whiteSpace: 'pre-wrap' }}>{text}</p>
          <div className="text-xs text-white/80 mt-2 flex items-center gap-2">
            <span>{date} at {time}</span>
            {eventid?.title && (
              <>
                <span>|</span>
                <Link to={`/eventdetails/${eventid._id}`}>
                  <span
                    className="px-2 py-1 rounded-md text-white"
                    style={{ backgroundColor: hexcolor ? `${hexcolor}dd` : '#4a90e2dd' }}
                  >
                    Event: {eventid.title}
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementCard;
