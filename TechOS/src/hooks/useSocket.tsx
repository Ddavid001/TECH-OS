import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

const SOCKET_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

export const useSocket = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Create socket connection
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    const socket = socketRef.current;

    // Connection handlers
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      setIsConnected(true);

      // Join institution room
      const institutionId = (user as any).user_metadata?.institutionId;
      if (institutionId) {
        socket.emit('join', `institution:${institutionId}`);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
    });

    // Listen for class reminders
    socket.on('class:reminder', (data: any) => {
      console.log('Class reminder received:', data);
      
      toast({
        title: `Upcoming: ${data.title}`,
        description: `Starting in ${data.minutesUntil} minutes`,
        duration: 10000,
      });

      // Also show browser notification if permission granted
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`Upcoming: ${data.title}`, {
          body: `Starting in ${data.minutesUntil} minutes`,
          icon: '/logo.png',
        });
      }
    });

    // Listen for delivery reminders
    socket.on('delivery:reminder', (data: any) => {
      console.log('Delivery reminder received:', data);
      
      toast({
        title: `Delivery Due: ${data.title}`,
        description: `Due in ${data.hoursUntil} hours`,
        duration: 10000,
      });
    });

    // Listen for daily summaries
    socket.on('daily:summary', (data: any) => {
      console.log('Daily summary received:', data);
      
      if (data.eventsCount > 0) {
        toast({
          title: 'Today\'s Schedule',
          description: `You have ${data.eventsCount} event${data.eventsCount !== 1 ? 's' : ''} today`,
          duration: 8000,
        });
      }
    });

    // Cleanup
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user, toast]);

  const joinRoom = (room: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('join', room);
    }
  };

  const leaveRoom = (room: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('leave', room);
    }
  };

  const emit = (event: string, data: any) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit(event, data);
    }
  };

  const on = (event: string, handler: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, handler);
    }
  };

  const off = (event: string, handler?: (data: any) => void) => {
    if (socketRef.current) {
      if (handler) {
        socketRef.current.off(event, handler);
      } else {
        socketRef.current.off(event);
      }
    }
  };

  return {
    socket: socketRef.current,
    isConnected,
    joinRoom,
    leaveRoom,
    emit,
    on,
    off,
  };
};

