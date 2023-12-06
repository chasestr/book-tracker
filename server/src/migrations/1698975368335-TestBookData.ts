import { MigrationInterface, QueryRunner } from "typeorm";

export class TestBookData1698975368335 implements MigrationInterface {
  public async up(): Promise<void> {
    // public async up(queryRunner: QueryRunner): Promise<void> {
    //   await queryRunner.query(`
    //   INSERT INTO book (title, author, publisher, pages, "startDate", "finishDate", notes, summary, genre, rating, "userId") VALUES
    // ('Secret Garden', 'Frances Hodgson Burnett', 'Secret Haven Publishing', 190, '2023-11-01 08:00:00', '2023-11-10 16:30:00', 'A hidden paradise', 'Discovering the beauty within', 'Fantasy', 4, 1),
    // ('Night Watchman', 'Laura Wilson', 'Night Owl Books', 370, '2023-11-02 09:15:00', '2023-11-12 15:45:00', 'A mysterious protector', 'Guarding the secrets of the night', 'Mystery', 3, 1),
    // ('Red Rose', 'Michael Thompson', 'Blossom Press', 240, '2023-11-03 10:30:00', '2023-11-15 12:30:00', 'A symbol of love', 'The timeless story of romance', 'Romance', 5, 1),
    // ('Into the Abyss', 'Jennifer White', 'Darkness Publishing', 300, '2023-11-04 11:45:00', '2023-11-16 14:00:00', 'A descent into darkness', 'Exploring the depths of the unknown', 'Horror', 4, 1),
    // ('Silent Lake', 'Daniel Turner', 'Reflections Press', 270, '2023-11-05 12:30:00', '2023-11-18 17:00:00', 'A tranquil sanctuary', 'Finding peace by the silent lake', 'Relaxation', 4, 1),
    // ('Whispers in the Night', 'Linda Taylor', 'Whispering Pines Press', 260, '2023-11-06 14:00:00', '2023-11-19 18:30:00', 'Mysterious voices', 'Listening to the secrets of the night', 'Mystery', 4, 1),
    // ('Lost Treasure', 'Robert Anderson', 'Adventure House', 330, '2023-11-07 15:15:00', '2023-11-20 19:45:00', 'A quest for riches', 'The search for hidden wealth', 'Adventure', 3, 1),
    // ('Enigma Code', 'Sarah Miller', 'SecretScape Books', 310, '2023-11-08 16:30:00', '2023-11-21 10:00:00', 'A cryptic enigma', 'Cracking the code of mystery', 'Thriller', 3, 1),
    // ('Shadow of the Sphinx', 'John Smith', 'XYZ Publications', 350, '2023-11-09 17:45:00', '2023-11-22 11:15:00', 'A thrilling mystery', 'A gripping tale of suspense', 'Mystery', 4, 1),
    // ('Echoes of Eternity', 'Emily Johnson', 'Fantastic Books Inc.', 420, '2023-11-10 18:00:00', '2023-11-23 12:30:00', 'An epic fantasy', 'A world of magic and adventure', 'Fantasy', 5, 1),
    // ('Mystic Moon', 'Robert Roberts', 'Moonlight Publishing', 260, '2023-11-11 08:00:00', '2023-11-24 16:30:00', 'A moonlit journey', 'Exploring the mysteries of the night', 'Mystery', 4, 1),
    // ('Dragon''s Fury', 'Laura Turner', 'Dragonfire Books', 370, '2023-11-12 09:15:00', '2023-11-25 15:45:00', 'A tale of fire and fury', 'The epic battle of dragons', 'Fantasy', 3, 1),
    // ('Eternal Love', 'John Williams', 'Heartsong Publishing', 310, '2023-11-13 10:30:00', '2023-11-26 12:30:00', 'A story of everlasting love', 'A timeless romance', 'Romance', 5, 1),
    // ('Journey to the Unknown', 'Alice Turner', 'Mystery House', 290, '2023-11-14 11:45:00', '2023-11-27 14:00:00', 'An adventure of discovery', 'Unraveling the enigmas of the world', 'Adventure', 4, 1),
    // ('The Forgotten Past', 'Samuel Jackson', 'History Books Inc.', 420, '2023-11-15 12:30:00', '2023-11-28 17:00:00', 'A voyage through time', 'Rediscovering our heritage', 'Historical', 4, 1),
    // ('Dark Secrets', 'Olivia Adams', 'Mystery Thrillers', 260, '2023-11-16 14:00:00', '2023-11-29 18:30:00', 'Hidden truths and deception', 'Unraveling the enigma of a lifetime', 'Thriller', 4, 1),
    // ('Island of Dreams', 'Mark Miller', 'Adventure Island Press', 330, '2023-11-17 15:15:00', '2023-11-30 19:45:00', 'A journey to paradise', 'Exploring the beauty of an island', 'Adventure', 3, 1),
    // ('Under the Moonlight', 'Sophia Turner', 'Nightfall Publications', 230, '2023-11-18 16:30:00', '2023-12-01 10:00:00', 'Romance under the stars', 'A love story that transcends time', 'Romance', 5, 1),
    // ('Whispers of the Forest', 'David Smith', 'Enchanted Woods Publishing', 320, '2023-11-19 17:45:00', '2023-12-02 11:15:00', 'A mystical forest', 'Listening to the secrets of the trees', 'Fantasy', 3, 1),
    // ('Mysterious Riddles', 'Rachel Turner', 'Puzzle Publications', 290, '2023-12-03 10:30:00', '2023-12-16 12:30:00', 'A collection of enigmas', 'Unraveling the mysteries of the mind', 'Puzzle', 4, 1),
    // ('Lost in Time', 'Christopher White', 'Timeless Books', 360, '2023-12-04 11:45:00', '2023-12-17 14:00:00', 'A journey through history', 'Discovering the secrets of the past', 'Historical', 4, 1),
    // ('The Sapphire Secret', 'Isabella Brown', 'Gems and Mysteries Publishing', 250, '2023-12-05 12:30:00', '2023-12-18 17:00:00', 'A precious gems mystery', 'Unveiling the hidden facets of a sapphire', 'Mystery', 5, 1),
    // ('Starlight Serenade', 'Thomas Harris', 'Celestial Harmony Books', 310, '2023-12-06 14:00:00', '2023-12-19 18:30:00', 'A celestial journey', 'Exploring the universe through music', 'Science Fiction', 4, 1),
    // ('The Midnight Cabal', 'Lucy Turner', 'Moonlit Mysteries', 270, '2023-12-07 15:15:00', '2023-12-20 19:45:00', 'A secret society', 'Unlocking the secrets of the midnight cabal', 'Mystery', 3, 1),
    // ('Emerald Isle', 'Patrick O''sullivan', 'Irish Adventures Ltd.', 330, '2023-12-08 16:30:00', '2023-12-21 10:00:00', 'An Irish escapade', 'Discovering the beauty of the Emerald Isle', 'Adventure', 4, 1),
    // ('Enchanted Woods', 'Emma Turner', 'Fairy Tales Inc.', 240, '2023-12-09 17:45:00', '2023-12-22 11:15:00', 'A magical realm', 'Exploring the world of enchantment', 'Fantasy', 5, 1),
    // ('The Puzzle Master', 'David Roberts', 'Mystery Puzzles', 300, '2023-12-10 18:00:00', '2023-12-23 12:30:00', 'A master of puzzles', 'Solving the enigmas of the Puzzle Master', 'Puzzle', 4, 1),
    // ('City of Illusions', 'Sophia Miller', 'Illusionist Books', 280, '2023-12-11 08:00:00', '2023-12-24 16:30:00', 'A world of magic', 'Diving into the illusions of the city', 'Fantasy', 3, 1),
    // ('Shadows in the Dark', 'Daniel Anderson', 'Darkness Unveiled Publishing', 320, '2023-12-12 09:15:00', '2023-12-25 15:45:00', 'In the realm of shadows', 'Unraveling the mysteries hidden in the dark', 'Horror', 4, 1),
    // ('The Silent Observer', 'Olivia Wilson', 'Watchful Eyes Publications', 250, '2023-12-13 10:30:00', '2023-12-26 12:30:00', 'An observer of secrets', 'Witnessing the unspoken truths', 'Mystery', 3, 1),
    // ('Island of Memories', 'Michael Thompson', 'Memory Lane Books', 350, '2023-12-14 11:45:00', '2023-12-27 14:00:00', 'A journey through memories', 'Recalling the treasures of the past', 'Adventure', 5, 1),
    // ('Sapphire Skies', 'Emily Johnson', 'Gemstone Sky Publications', 280, '2023-12-15 12:30:00', '2023-12-28 17:00:00', 'A journey through the skies', 'Exploring the beauty of the celestial sapphires', 'Science Fiction', 4, 1),
    // ('The Enchanted Forest', 'John Smith', 'Magical Realms Publishing', 330, '2023-12-16 14:00:00', '2023-12-29 18:30:00', 'A world of enchantment', 'Discovering the secrets of the enchanted forest', 'Fantasy', 4, 1),
    // ('Echoes of Time', 'Laura Turner', 'Time Travel Books', 290, '2023-12-17 15:15:00', '2023-12-30 19:45:00', 'A journey through the ages', 'Unveiling the echoes of history', 'Time Travel', 3, 1),
    // ('Riddle of the Sphinx', 'Matthew Smith', 'Puzzle Mysteries', 320, '2023-12-18 16:30:00', '2023-12-31 10:00:00', 'Unraveling the riddles', 'Solving the mysteries of the Sphinx', 'Puzzle', 4, 1),
    // ('Realm of Dreams', 'Elizabeth Turner', 'Dreamscape Books', 240, '2023-12-19 17:45:00', '2024-01-01 11:15:00', 'A world of dreams', 'Exploring the boundaries of the dream realm', 'Fantasy', 5, 1),
    // ('Secrets of the Mind', 'James Miller', 'Mindreader Publications', 310, '2023-12-20 18:00:00', '2024-01-02 12:30:00', 'A journey into the mind', 'Unlocking the secrets of the human psyche', 'Psychology', 4, 1),
    // ('The Art of Deception', 'Sophia Roberts', 'Illusionist Publishing', 270, '2023-12-21 08:00:00', '2024-01-03 16:30:00', 'Mastering the art of deception', 'Unraveling the world of illusion', 'Magic', 3, 1);
    //   `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
