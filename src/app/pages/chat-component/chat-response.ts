export interface Ichat {
  id: string;
  text: string;
  created_at: string;
  editable: boolean;
  sender: string;
  users: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
}
