const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    username: "User",
    email: "user1@nextmail.com",
    password: "123456",
    profile_picture_url: "https://example.com/user.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const beats = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    title: "BEAT 1",
    description: "Description",
    file_url: "https://example.com/music.mp3",
    cover_image_url: "https://example.com/cover.jpg",
    genre: "Rap",
    duration: "3:00",
    key: "C Major",
    bpm: 120,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const tracks = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    current_version_id: "510544b2-4001-4271-9855-fec4b6a6442f",
    title: "SLEEPOVER",
    description: "Description",
    file_url: "https://example.com/music.mp3",
    cover_image_url: "https://example.com/cover.jpg",
    genre: "Rap",
    duration: "3:00",
    key: "C Major",
    bpm: 120,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const track_versions = [
  {
    id: "510544b2-4001-4271-9855-fec4b6a6442e",
    track_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    version_number: 1,
    file_url: "https://example.com/music_v1.mp3",
    duration: "3:00",
    key: "C Major",
    bpm: 120,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "510544b2-4001-4271-9855-fec4b6a6442f",
    track_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    version_number: 2,
    file_url: "https://example.com/music_v2.mp3",
    duration: "3:20",
    key: "C Major",
    bpm: 120,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

module.exports = {
  users,
  tracks,
  track_versions,
  beats,
};
