import React from 'react';
import { NavLink } from 'react-router-dom';
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
  BarChart3
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Generate Quiz', href: '/quiz', icon: Upload },
  { name: 'Quiz History', href: '/quiz-history', icon: History },
  { name: 'Chat with Notes', href: '/chat', icon: MessageCircle },
  { name: 'Flashcards', href: '/flashcards', icon: CreditCard },
  { name: 'Mind Maps', href: '/mindmap', icon: GitBranch },
  { name: 'My Files', href: '/files', icon: FileText },
];

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help & Support', href: '/help', icon: HelpCircle },
];

export function Sidebar() {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white/50 backdrop-blur-sm border-r border-gray-200/50">
        <div className="flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => (
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
            ))}
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