import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  MessageCircle, 
  CreditCard, 
  GitBranch,
  Upload,
  Settings,
  HelpCircle,
  History,
  BarChart3,
  Crown,
  ChevronDown,
  ChevronRight,
  List,
  Plus
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { 
    name: 'Quizzes', 
    icon: FileText,
    defaultHref: '/quiz-history',
    children: [
      { name: 'All Quizzes', href: '/quiz-history', icon: List },
      { name: 'Generate Quiz', href: '/quiz', icon: Plus },
      { name: 'Quiz Analytics', href: '/quiz-analytics', icon: BarChart3 }
    ]
  },
  { name: 'Chat with Notes', href: '/chat', icon: MessageCircle },
  { name: 'Flashcards', href: '/flashcards', icon: CreditCard },
  { name: 'Mind Maps', href: '/mindmap', icon: GitBranch },
  { name: 'My Files', href: '/files', icon: FileText },
];

const secondaryNavigation = [
  { name: 'Subscription', href: '/subscription', icon: Crown },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help & Support', href: '/help', icon: HelpCircle },
];

export function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(['Quizzes']);
  const location = useLocation();

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isQuizRoute = (pathname: string) => {
    return pathname.includes('/quiz') || pathname === '/quiz-history' || pathname === '/quiz-analytics';
  };

  // Auto-expand quiz section if on a quiz-related route
  React.useEffect(() => {
    if (isQuizRoute(location.pathname) && !expandedItems.includes('Quizzes')) {
      setExpandedItems(prev => [...prev, 'Quizzes']);
    }
  }, [location.pathname, expandedItems]);

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white/50 backdrop-blur-sm border-r border-gray-200/50">
        <div className="flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => {
              if (item.children) {
                const isExpanded = expandedItems.includes(item.name);
                const hasActiveChild = item.children.some(child => location.pathname === child.href);
                
                return (
                  <div key={item.name}>
                    <NavLink
                      to={item.defaultHref || '#'}
                      onClick={(e) => {
                        if (!item.defaultHref) {
                          e.preventDefault();
                        }
                        toggleExpanded(item.name);
                      }}
                      className={({ isActive }) =>
                        `group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                          hasActiveChild || isQuizRoute(location.pathname) || isActive
                            ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                      }
                    >
                      <item.icon
                        className="mr-3 flex-shrink-0 h-5 w-5"
                        aria-hidden="true"
                      />
                      <span className="flex-1 text-left">{item.name}</span>
                      {isExpanded ? (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronRight className="ml-2 h-4 w-4" />
                      )}
                    </NavLink>
                    
                    {isExpanded && (
                      <div className="mt-1 ml-6 space-y-1">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.name}
                            to={child.href}
                            className={({ isActive }) =>
                              `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                isActive
                                  ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-r-2 border-indigo-500'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              }`
                            }
                          >
                            <child.icon
                              className="mr-3 flex-shrink-0 h-4 w-4"
                              aria-hidden="true"
                            />
                            {child.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-r-2 border-indigo-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-5 w-5"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
        
        <div className="flex-shrink-0 flex border-t border-gray-200 p-2">
          <nav className="flex-1 space-y-1">
            {secondaryNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon
                  className="mr-3 flex-shrink-0 h-4 w-4"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}