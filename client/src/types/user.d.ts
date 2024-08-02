export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  
  export interface UserContextType {
    users: User[];
    addUser: (user: User) => void;
    updateUser: (user: User) => void;
    deleteUser: (userId: string) => void;
  }
  