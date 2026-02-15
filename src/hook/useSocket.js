import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { REACT_APP_BACKEND_URL } from '../utils';

export default function useSocket() {
    useEffect(() => {
        const socket = io(REACT_APP_BACKEND_URL);
    }, []);

    return {}
}
