const { db } = require("@vercel/postgres");
const bcrypt = require("bcrypt");
const {
  users,
  tracks,
  track_versions,
  beats,
} = require("../lib/placeholder-data.js");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        profile_picture_url TEXT, 
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async user => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, username, email, password, profile_picture_url, created_at, updated_at)
        VALUES (${user.id}, ${user.username}, ${user.email}, ${hashedPassword}, ${user.profile_picture_url}, ${user.created_at}, ${user.updated_at})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return insertedUsers;
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedBeats(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS beats (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id),
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      genre VARCHAR(255) NOT NULL,
      key VARCHAR(255) NOT NULL,
      bpm INT NOT NULL,
      duration VARCHAR(255) NOT NULL,
      cover_image_url TEXT NOT NULL,
      file_url TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
    `;

    console.log(`Created "beats" table`);

    const insertedBeats = await Promise.all(
      beats.map(async beat => {
        return client.sql`
        INSERT INTO beats (id, user_id, title, description, genre, key, bpm, duration, cover_image_url, file_url, created_at, updated_at)
        VALUES (${beat.id}, ${beat.user_id}, ${beat.title}, ${beat.description}, ${beat.genre}, ${beat.key}, ${beat.bpm}, ${beat.duration}, ${beat.cover_image_url}, ${beat.file_url}, ${beat.created_at}, ${beat.updated_at})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedBeats.length} tracks`);

    return insertedBeats;
  } catch (error) {
    console.error("Error seeding beats:", error);
    throw error;
  }
}

async function seedTracks(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "tracks" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS tracks (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL ,
        current_version_id UUID,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        genre VARCHAR(255) NOT NULL,
        cover_image_url TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;

    console.log(`Created "tracks" table`);

    // Insert data into the "tracks" table
    const insertedTracks = await Promise.all(
      tracks.map(async track => {
        return client.sql`
        INSERT INTO tracks (id, user_id, current_version_id, title, description, genre, cover_image_url, created_at, updated_at)
        VALUES (${track.id}, ${track.user_id}, ${track.current_version_id}, ${track.title}, ${track.description}, ${track.genre}, ${track.cover_image_url}, ${track.created_at}, ${track.updated_at})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedTracks.length} tracks`);

    return insertedTracks;
  } catch (error) {
    console.error("Error seeding tracks:", error);
    throw error;
  }
}

async function seedTrackVersions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "track_versions" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS track_versions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        track_id UUID NOT NULL REFERENCES tracks(id),
        version_number INT NOT NULL,
        file_url TEXT NOT NULL,
        duration VARCHAR(255) NOT NULL,
        key VARCHAR(255) NOT NULL,
        bpm INT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;

    console.log(`Created "track_versions" table`);

    // Insert data into the "track_versions" table
    const insertedTrackVersions = await Promise.all(
      track_versions.map(async version => {
        return client.sql`
        INSERT INTO track_versions (id, track_id, version_number, file_url, duration, key, bpm, created_at, updated_at)
        VALUES (${version.id}, ${version.track_id}, ${version.version_number}, ${version.file_url}, ${version.duration}, ${version.key}, ${version.bpm}, ${version.created_at}, ${version.updated_at})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedTrackVersions.length} track versions`);

    return insertedTrackVersions;
  } catch (error) {
    console.error("Error seeding track versions:", error);
    throw error;
  }
}

// async function seedInvoices(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "invoices" table if it doesn't exist
//     const createTable = await client.sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//     customer_id UUID NOT NULL,
//     amount INT NOT NULL,
//     status VARCHAR(255) NOT NULL,
//     date DATE NOT NULL
//   );
// `;

//     console.log(`Created "invoices" table`);

//     // Insert data into the "invoices" table
//     const insertedInvoices = await Promise.all(
//       invoices.map(
//         (invoice) => client.sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedInvoices.length} invoices`);

//     return {
//       createTable,
//       invoices: insertedInvoices,
//     };
//   } catch (error) {
//     console.error('Error seeding invoices:', error);
//     throw error;
//   }
// }

// async function seedCustomers(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "customers" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS customers (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         image_url VARCHAR(255) NOT NULL
//       );
//     `;

//     console.log(`Created "customers" table`);

//     // Insert data into the "customers" table
//     const insertedCustomers = await Promise.all(
//       customers.map(
//         (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedCustomers.length} customers`);

//     return {
//       createTable,
//       customers: insertedCustomers,
//     };
//   } catch (error) {
//     console.error('Error seeding customers:', error);
//     throw error;
//   }
// }

// async function seedRevenue(client) {
//   try {
//     // Create the "revenue" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS revenue (
//         month VARCHAR(4) NOT NULL UNIQUE,
//         revenue INT NOT NULL
//       );
//     `;

//     console.log(`Created "revenue" table`);

//     // Insert data into the "revenue" table
//     const insertedRevenue = await Promise.all(
//       revenue.map(
//         (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedRevenue.length} revenue`);

//     return {
//       createTable,
//       revenue: insertedRevenue,
//     };
//   } catch (error) {
//     console.error('Error seeding revenue:', error);
//     throw error;
//   }
// }

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedTracks(client);
  await seedTrackVersions(client);
  await seedBeats(client);

  await client.end();
}

main().catch(err => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
