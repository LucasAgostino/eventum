// src/components/SendInvitationsButton.jsx
import { useState } from 'react';

const SendInvitationsButton = ({ eventId }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendInvitations = async () => {
    setLoading(true);
    setMessage('');

    const res = await fetch(`/api/send-invitations/${eventId}`, {
      method: 'POST',
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Invitaciones enviadas exitosamente.');
    } else {
      setMessage('Error al enviar las invitaciones: ' + data.error);
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={sendInvitations} disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Invitaciones'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendInvitationsButton;
