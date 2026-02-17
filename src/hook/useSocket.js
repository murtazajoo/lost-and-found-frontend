import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { REACT_APP_BACKEND_URL } from '../utils';

export default function useSocket() {
    const ioRef = useRef(null);

    useEffect(() => {
        const socket = io(REACT_APP_BACKEND_URL);
        ioRef.current = socket;
        return () => {
            socket.disconnect();
        };
    }, []);

    const subscribeToRoom = (room, callback) => {
        if (ioRef.current) {
            ioRef.current.emit('joinRoom', room);
            ioRef.current.on('receive_message', callback);
        }
    };

    const sendMessage = (content, roomId, sender, receiver, itemId) => {
        if (ioRef.current) {
            ioRef.current.emit('send_message', { content, room: roomId, sender, receiver, itemId });
        }
    };

    const send = (event, data) => {
        if (ioRef.current) {
            ioRef.current.emit(event, data);
        }
    };

    const subscribe = (event, callback) => {
        if (ioRef.current) {
            ioRef.current.on(event, callback);
        }
    }

    return { subscribeToRoom, sendMessage, send, subscribe };
}
