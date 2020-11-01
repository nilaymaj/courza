import * as React from 'react';
import socketIo from 'socket.io-client';

const developmentWsHost = 'http://localhost:8001';
const productionWsHost = process.env.REACT_APP_WS_HOST as string;
const socketEndpoint =
  process.env.NODE_ENV === 'production' ? productionWsHost : developmentWsHost;

/**
 * Wrapper class around Socket.IO socket instance, that
 * allows for connect-disconnect and listeners
 */
class SocketManager {
  _socket: SocketIOClient.Socket | null;

  constructor() {
    this._socket = null;
  }

  connect() {
    this._socket = socketIo(socketEndpoint);
  }

  disconnect() {
    if (!this._socket) return console.warn('Tried to disconnect null socket');
    this._socket.disconnect();
    this._socket = null;
  }

  addListener(courseId: string, handler: (payload: any) => void) {
    if (!this._socket) return console.warn('Tried to listen on null socket');
    this._socket.on(courseId, handler);
  }

  removeListener(courseId: string, handler: (payload: any) => void) {
    if (!this._socket) return console.warn('Tried to unlisten on null socket');
    this._socket.off(courseId, handler);
  }
}

export const RealtimeEventsContext = React.createContext(new SocketManager());
const _socketManager = new SocketManager();

const RealtimeEventsProvider = (props: { children: React.ReactNode }) => {
  const socketManagerRef = React.useRef<SocketManager>(_socketManager);

  // Connect to socket server
  React.useEffect(() => {
    socketManagerRef.current.connect();
    return () => socketManagerRef.current.disconnect();
  }, []);

  return (
    <RealtimeEventsContext.Provider value={socketManagerRef.current}>
      {props.children}
    </RealtimeEventsContext.Provider>
  );
};

export default RealtimeEventsProvider;
