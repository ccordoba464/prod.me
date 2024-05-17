export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  profile_picture_url: string;
  created_at: string;
  updated_at: string;
};

export type Track = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  file_url: string;
  cover_image_url: string;
  genre: string;
  duration: string;
  key: string;
  bpm: number;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  cover_image_url: string;
  created_at: string;
  updated_at: string;
};

export type Project_track = {
  playlist_id: string;
  track_id: string;
  position: number; // Order of track in playlist
};

export type Like = {
  id: string;
  user_id: string;
  track_id: string;
  created_at: string;
};

export type Comment = {
  id: string;
  user_id: string;
  track_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type Follow = {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
};

export type Play = {
  id: string;
  user_id: string | null; // Nullable for anonymous plays
  track_id: string;
  created_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  type: string; // e.g., new follower, track liked, etc.
  related_user_id: string | null;
  related_track_id: string | null;
  message: string;
  created_at: string;
  read_at: string | null;
};

export type Genre = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};
