// src/components/SendInvitationsButton.jsx
import { useState } from "react";

const SendInvitationsButton = ({ eventId }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendInvitations = async () => {
    setLoading(true);
    setMessage("");

    const res = await fetch(`/api/send-invitations/${eventId}`, {
      method: "POST",
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Invitaciones enviadas exitosamente.");
    } else {
      setMessage("Error al enviar las invitaciones: " + data.error);
    }

    setLoading(false);
  };

  return (
    <div className="w-full sm:w-auto">
      <button
        onClick={sendInvitations}
        disabled={loading}
        className="flex items-center justify-center bg-violeta w-full gap-1 px-4 py-3 cursor-pointer text-white font-semibold tracking-widest rounded-md sm:w-auto hover:bg-violoscuro duration-300 hover:gap-2"
      >
        <svg
          className="w-5 h-5"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
        {loading ? "Enviando..." : "Enviar Invitaciones"}
      </button>
      {message && <p className="mt-2 text-center text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default SendInvitationsButton;
