import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    username: "User",
    email: "user1@nextmail.com",
    password: "123456",
    profile_picture_url: "https://example.com/user.jpg",
    created_at: new Date(),
    updated_at: new Date(),
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
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const tracks = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    title: "SLEEPOVER",
    description: "Description",
    cover_image_url: "https://example.com/cover.jpg",
    genre: "Rap",
    created_at: new Date(),
    updated_at: new Date(),
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
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "510544b2-4001-4271-9855-fec4b6a6442f",
    track_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    version_number: 2,
    file_url: "https://example.com/music_v2.mp3",
    duration: "3:20",
    key: "C Major",
    bpm: 120,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const comments = [
  {
    id: "610544b2-4001-4271-9855-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    track_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    content: "Great track!",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function main() {
  // Deleting all existing records
  await prisma.track_version.deleteMany({});
  await prisma.track.deleteMany({});
  await prisma.beat.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.user.deleteMany({});

  // Creating new records
  await prisma.user.createMany({ data: users });
  await prisma.beat.createMany({ data: beats });
  await prisma.track.createMany({ data: tracks });
  await prisma.track_version.createMany({ data: track_versions });
  await prisma.comment.createMany({ data: comments });
  s;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
