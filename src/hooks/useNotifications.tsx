import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification } from '../components/notifications/NotificationCenter';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  showSuccess: (title: string, message: string) => void;
  showError: (title: string, message: string) => void;
  showInfo: (title: string, message: string) => void;
  showWarning: (title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Mock notifications for demonstration
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'achievement',
    title: 'Quiz Master Achievement! 🏆',
    message: 'Congratulations! You\'ve completed 10 quizzes this week and maintained an average score of 87%. Keep up the excellent work!',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    read: false,
    actionUrl: '/quiz-history',
    actionText: 'View Progress'
  },
  {
    id: '2',
    type: 'quiz',
    title: 'New Quiz Ready',
    message: 'Your "React Components & Lifecycle" quiz has been generated from the uploaded PDF. It contains 15 questions covering all key concepts.',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    read: false,
    actionUrl: '/quiz/1',
    actionText: 'Take Quiz'
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Study Reminder 📚',
    message: 'Don\'t forget to review your JavaScript ES6 flashcards today! You\'re on a 5-day study streak.',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    read: true,
    actionUrl: '/flashcards',
    actionText: 'Review Now'
  },
  {
    id: '4',
    type: 'success',
    title: 'Notes Generated Successfully',
    message: 'Your comprehensive study notes from "Machine Learning Fundamentals.pdf" are ready. The notes include key concepts, examples, and practice questions.',
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    read: true,
    actionUrl: '/notes',
    actionText: 'View Notes'
  },
  {
    id: '5',
    type: 'info',
    title: 'New Feature Available',
    message: 'Enhanced mind mapping tools with AI-powered suggestions are now available. Create visual learning maps from your notes automatically.',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    read: true,
    actionUrl: '/mindmap',
    actionText: 'Try Now'
  },
  {
    id: '6',
    type: 'warning',
    title: 'Storage Almost Full',
    message: 'You\'ve used 4.2GB of your 5GB storage limit. Consider upgrading to Pro for unlimited storage.',
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    read: false,
    actionUrl: '/pricing',
    actionText: 'Upgrade'
  }
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('quizcraft_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
      } catch {
        return mockNotifications;
      }
    }
    return mockNotifications;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  // Save to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem('quizcraft_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Convenience methods for common notification types
  const showSuccess = (title: string, message: string) => {
    addNotification({ type: 'success', title, message });
  };

  const showError = (title: string, message: string) => {
    addNotification({ type: 'error', title, message });
  };

  const showInfo = (title: string, message: string) => {
    addNotification({ type: 'info', title, message });
  };

  const showWarning = (title: string, message: string) => {
    addNotification({ type: 'warning', title, message });
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAllNotifications,
      showSuccess,
      showError,
      showInfo,
      showWarning
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}