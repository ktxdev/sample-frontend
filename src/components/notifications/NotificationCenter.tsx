import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  Check, 
  Info, 
  AlertTriangle, 
  AlertCircle, 
  FileText, 
  Trophy, 
  Clock, 
  Settings, 
  Trash2,
  CheckCheck,
  Filter
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'quiz' | 'achievement' | 'reminder';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <Check className="w-4 h-4" />;
    case 'info':
      return <Info className="w-4 h-4" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4" />;
    case 'error':
      return <AlertCircle className="w-4 h-4" />;
    case 'quiz':
      return <FileText className="w-4 h-4" />;
    case 'achievement':
      return <Trophy className="w-4 h-4" />;
    case 'reminder':
      return <Clock className="w-4 h-4" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
};

const getNotificationStyle = (type: string) => {
  switch (type) {
    case 'success':
      return {
        iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-l-emerald-500'
      };
    case 'info':
      return {
        iconBg: 'bg-blue-100 dark:bg-blue-900/50',
        iconColor: 'text-blue-600 dark:text-blue-400',
        border: 'border-l-blue-500'
      };
    case 'warning':
      return {
        iconBg: 'bg-yellow-100 dark:bg-yellow-900/50',
        iconColor: 'text-yellow-600 dark:text-yellow-400',
        border: 'border-l-yellow-500'
      };
    case 'error':
      return {
        iconBg: 'bg-red-100 dark:bg-red-900/50',
        iconColor: 'text-red-600 dark:text-red-400',
        border: 'border-l-red-500'
      };
    case 'quiz':
      return {
        iconBg: 'bg-indigo-100 dark:bg-indigo-900/50',
        iconColor: 'text-indigo-600 dark:text-indigo-400',
        border: 'border-l-indigo-500'
      };
    case 'achievement':
      return {
        iconBg: 'bg-purple-100 dark:bg-purple-900/50',
        iconColor: 'text-purple-600 dark:text-purple-400',
        border: 'border-l-purple-500'
      };
    case 'reminder':
      return {
        iconBg: 'bg-orange-100 dark:bg-orange-900/50',
        iconColor: 'text-orange-600 dark:text-orange-400',
        border: 'border-l-orange-500'
      };
    default:
      return {
        iconBg: 'bg-gray-100 dark:bg-gray-700',
        iconColor: 'text-gray-600 dark:text-gray-400',
        border: 'border-l-gray-500'
      };
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
};

export function NotificationCenter({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll
}: NotificationCenterProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const notificationRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, onClose]);

  const filteredNotifications = notifications.filter(notification => {
    return filter === 'all' || (filter === 'unread' && !notification.read);
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-start justify-end z-50 p-4">
      <motion.div
        ref={notificationRef}
        initial={{ opacity: 0, x: 300, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 300, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-sm mt-16"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Notifications</h2>
                  {unreadCount > 0 && (
                    <p className="text-sm text-indigo-100">
                      {unreadCount} unread
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex mt-4 bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-indigo-100 hover:text-white hover:bg-white/10'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  filter === 'unread'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-indigo-100 hover:text-white hover:bg-white/10'
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          {notifications.length > 0 && (
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {unreadCount > 0 && (
                    <Button size="sm" variant="ghost" onClick={onMarkAllAsRead}>
                      <CheckCheck className="w-4 h-4 mr-1" />
                      Mark all read
                    </Button>
                  )}
                </div>
                <Button size="sm" variant="ghost" onClick={onClearAll} className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear all
                </Button>
              </div>
            </div>
          )}

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto bg-white dark:bg-gray-800">
            <AnimatePresence mode="popLayout">
              {filteredNotifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center bg-white dark:bg-gray-800"
                >
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {filter === 'unread' ? 'All caught up!' : 'No notifications'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {filter === 'unread' 
                      ? 'You have no unread notifications.' 
                      : 'You have no notifications yet.'
                    }
                  </p>
                </motion.div>
              ) : (
                filteredNotifications.map((notification, index) => {
                  const style = getNotificationStyle(notification.type);
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100, height: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className={`relative border-l-4 ${style.border} ${
                        !notification.read 
                          ? 'bg-white dark:bg-gray-800' 
                          : 'bg-gray-50 dark:bg-gray-800/70'
                      } hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group`}
                    >
                      <div className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 w-8 h-8 ${style.iconBg} rounded-lg flex items-center justify-center ${style.iconColor}`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className={`text-sm font-medium ${
                                  !notification.read 
                                    ? 'text-gray-900 dark:text-gray-100' 
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}>
                                  {notification.title}
                                </h4>
                                <p className={`text-sm mt-1 leading-relaxed ${
                                  !notification.read 
                                    ? 'text-gray-700 dark:text-gray-300' 
                                    : 'text-gray-600 dark:text-gray-400'
                                }`}>
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between mt-3">
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatTimeAgo(notification.timestamp)}
                                  </p>
                                  
                                  {notification.actionUrl && notification.actionText && (
                                    <Button size="sm" variant="ghost" className="text-xs h-6 px-2">
                                      {notification.actionText}
                                    </Button>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {!notification.read && (
                                  <button
                                    onClick={() => onMarkAsRead(notification.id)}
                                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                                    title="Mark as read"
                                  >
                                    <Check className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                                  </button>
                                )}
                                <button
                                  onClick={() => onDelete(notification.id)}
                                  className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors"
                                  title="Delete notification"
                                >
                                  <X className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {!notification.read && (
                          <div className="absolute right-3 top-4">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <Button variant="ghost" size="sm" className="w-full justify-center">
              <Settings className="w-4 h-4 mr-2" />
              Notification Settings
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}