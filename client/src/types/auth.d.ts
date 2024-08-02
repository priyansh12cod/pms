export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  }
  
  export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
  }
  