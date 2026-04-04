export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  is_blocked: boolean;
  created_at: string | null;
  updated_at: string;
}

export interface Invitee {
  id: string;
  name: string;
  code: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: User;
}
