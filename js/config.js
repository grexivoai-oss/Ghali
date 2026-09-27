/**
 * "The Story of Us" — Netflix-Style Relationship Website
 * Dedicated to: My Ghali, My Biwi, My Khurat Biwi, Meri Gundi, Mera Bacho Ki Maa, Meri Sabkuch
 * Features image 17 as hero, duplicate video 29 removed, all unique videos & polaroids, and 3 looping songs.
 */

const CONFIG = {
  show: {
    tag: "FOR MY GHALI",
    title: "THE STORY OF US",
    synopsis: "A quiet collection of memories told through our camera roll—where fleeting moments, soft glances, and unspoken feelings capture our story. Dedicated to my Ghali, my biwi, my khurat biwi, meri gundi, mera bacho ki maa, and meri sabkuch: two souls deeply in love, creating a lifetime of memories together.",
    heroImage: "All videos and Pictures/17.jpeg", // Set to Image 17 as requested!
    heroVideo: "All videos and Pictures/2.mp4",
    badge: "100% Match",
    year: "Forever & Always",
    rating: "TV-LOVE",
    seasons: "3 Seasons • 23 Video Episodes & 20 Polaroids",
    genres: ["True Love", "Romantic", "Heartfelt", "Soulmates"],
    cast: ["My Ghali & Me", "Meri Biwi", "Meri Sabkuch"],
  },

  // 3 Songs provided by user for continuous background looping
  songs: [
    {
      title: "Can't Help Falling in Love",
      artist: "Elvis Presley",
      src: "songs/cant-help-falling-in-love.mp3"
    },
    {
      title: "her",
      artist: "JVKE",
      src: "songs/jvke-her.mp3"
    },
    {
      title: "First Born Daughter",
      artist: "Max McNown",
      src: "songs/first-born-daughter.mp3"
    }
  ],

  // Screen 1: Profiles ("Who's watching?")
  profiles: [
    {
      id: "p1",
      name: "My Ghali",
      subtitle: "The Queen of My Heart",
      avatar: "All videos and Pictures/1.jpeg",
    },
    {
      id: "p2",
      name: "My Biwi",
      subtitle: "My Beautiful Wife",
      avatar: "All videos and Pictures/4.jpeg",
    },
    {
      id: "p3",
      name: "Khurat Biwi",
      subtitle: "Cute Angry Wife Mode 😤❤️",
      avatar: "All videos and Pictures/8.jpeg",
    },
    {
      id: "p4",
      name: "Meri Gundi",
      subtitle: "My Trouble Maker",
      avatar: "All videos and Pictures/11.jpeg",
    },
    {
      id: "p5",
      name: "Meri Sabkuch",
      subtitle: "My Everything & Forever",
      avatar: "All videos and Pictures/12.jpeg",
    }
  ],

  // ALL 23 UNIQUE VIDEO EPISODES (duplicate 29.mp4 removed)
  seasons: [
    {
      seasonNumber: 1,
      seasonTitle: "Season 1: How I Fell For My Ghali",
      episodes: [
        {
          id: 1,
          season: "S1",
          episode: "E1",
          posterTitle: "STRANGERS",
          episodeTitle: "The Day My Eyes Found You",
          posterImage: "All videos and Pictures/1.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/2.mp4",
          duration: "0:45",
          description: "Where our universe began. Two quiet glances across the room, nervous smiles, and the moment I saw my Ghali for the first time."
        },
        {
          id: 2,
          season: "S1",
          episode: "E2",
          posterTitle: "MERI GUNDI",
          episodeTitle: "That Smile That Stole My Heart",
          posterImage: "All videos and Pictures/4.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/3.mp4",
          duration: "1:12",
          description: "Inside jokes, playful teasing, and the realization that meri gundi had completely captured my soul."
        },
        {
          id: 3,
          season: "S1",
          episode: "E3",
          posterTitle: "KHURAT BIWI",
          episodeTitle: "Cute Anger & Endless Laughs",
          posterImage: "All videos and Pictures/8.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/6.mp4",
          duration: "1:05",
          description: "When my khurat biwi gets upset, it is the most adorable sight in the world. Making you smile again is my greatest joy."
        },
        {
          id: 4,
          season: "S1",
          episode: "E4",
          posterTitle: "MORE THAN FRIENDS",
          episodeTitle: "Butterflies in the Quiet Moments",
          posterImage: "All videos and Pictures/9.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/7.mp4",
          duration: "0:58",
          description: "Late night calls, shared dreams, and knowing that you were becoming the center of my world."
        },
        {
          id: 5,
          season: "S1",
          episode: "E5",
          posterTitle: "MY BIWI",
          episodeTitle: "Photobooth Strips & Holding Hands",
          posterImage: "All videos and Pictures/11.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/10.mp4",
          duration: "1:30",
          description: "Our sweetest memories tucked in our pockets. Holding hands and making silent promises to stay by your side forever."
        },
        {
          id: 6,
          season: "S1",
          episode: "E6",
          posterTitle: "MERA BACHO KI MAA",
          episodeTitle: "Dreaming of Our Future Together",
          posterImage: "All videos and Pictures/17.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/13.mp4",
          duration: "1:15",
          description: "Looking at you and imagining our home, our life, and the most loving mother to our future little ones."
        },
        {
          id: 7,
          season: "S1",
          episode: "E7",
          posterTitle: "MERI SABKUCH",
          episodeTitle: "You Are My Entire Universe",
          posterImage: "All videos and Pictures/18.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/14.mp4",
          duration: "1:40",
          description: "No words in any language could ever measure what you mean to me. You are my happiness, my peace, meri sabkuch."
        },
        {
          id: 8,
          season: "S1",
          episode: "E8",
          posterTitle: "MY EVERYTHING",
          episodeTitle: "Holding You Close Forever",
          posterImage: "All videos and Pictures/20.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/16.mp4",
          duration: "1:25",
          description: "The warmth of your embrace. In your arms, I have found everything I have ever prayed for."
        }
      ]
    },
    {
      seasonNumber: 2,
      seasonTitle: "Season 2: Adventures With My Khurat Biwi",
      episodes: [
        {
          id: 9,
          season: "S2",
          episode: "E1",
          posterTitle: "LATE NIGHT TALKS",
          episodeTitle: "Whispers Under The City Sky",
          posterImage: "All videos and Pictures/12.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/21.mp4",
          duration: "1:20",
          description: "Talking about everything and nothing until 3 AM, wishing time would freeze right there."
        },
        {
          id: 10,
          season: "S2",
          episode: "E2",
          posterTitle: "SILLY FIGHTS",
          episodeTitle: "When My Khurat Biwi Pouts",
          posterImage: "All videos and Pictures/19.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/28.mp4", // Unique 28.mp4 (duplicate 29.mp4 skipped)
          duration: "1:10",
          description: "Even your angry face makes my heart skip a beat. Nobody pouts more cutely than my biwi."
        },
        {
          id: 11,
          season: "S2",
          episode: "E3",
          posterTitle: "CAR RIDES & MUSIC",
          episodeTitle: "Singing Out Loud With Meri Gundi",
          posterImage: "All videos and Pictures/23.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/30.mp4",
          duration: "1:15",
          description: "Windows down, music blasting, and my favorite passenger singing every lyric by my side."
        },
        {
          id: 12,
          season: "S2",
          episode: "E4",
          posterTitle: "HOLDING HANDS",
          episodeTitle: "Never Letting You Go",
          posterImage: "All videos and Pictures/24.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/32.mp4",
          duration: "1:08",
          description: "Fingers intertwined, walking together through life, knowing no storm can ever separate us."
        },
        {
          id: 13,
          season: "S2",
          episode: "E5",
          posterTitle: "OUR INSIDE JOKES",
          episodeTitle: "Nobody Makes Me Laugh Like You",
          posterImage: "All videos and Pictures/27.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/33.mp4",
          duration: "1:22",
          description: "A secret language only we understand. Uncontrollable laughter that heals every tiring day."
        },
        {
          id: 14,
          season: "S2",
          episode: "E6",
          posterTitle: "PURE MAGIC",
          episodeTitle: "Falling Deeper Every Single Day",
          posterImage: "All videos and Pictures/28.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/34.mp4",
          duration: "1:40",
          description: "With every sunrise, I love my Ghali more than yesterday and less than tomorrow."
        },
        {
          id: 15,
          season: "S2",
          episode: "E7",
          posterTitle: "MY SAFE HAVEN",
          episodeTitle: "In Your Arms Is Home",
          posterImage: "All videos and Pictures/31.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/35.mp4",
          duration: "1:50",
          description: "No matter how noisy the world gets, looking into your eyes brings instant peace."
        }
      ]
    },
    {
      seasonNumber: 3,
      seasonTitle: "Season 3: To Infinity & Beyond With Meri Sabkuch",
      episodes: [
        {
          id: 16,
          season: "S3",
          episode: "E1",
          posterTitle: "GOLDEN HOUR",
          episodeTitle: "Lighting Up My Entire World",
          posterImage: "All videos and Pictures/38.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/36.mp4",
          duration: "1:18",
          description: "The sunset glow on your face. You are the most breathtaking view I could ever look at."
        },
        {
          id: 17,
          season: "S3",
          episode: "E2",
          posterTitle: "UNBREAKABLE BOND",
          episodeTitle: "Through Every High & Low",
          posterImage: "All videos and Pictures/39.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/37.mp4",
          duration: "1:25",
          description: "We have built something unbreakable. Side by side, always and without hesitation."
        },
        {
          id: 18,
          season: "S3",
          episode: "E3",
          posterTitle: "ENDLESS LOVE",
          episodeTitle: "More Than Words Can Ever Say",
          posterImage: "All videos and Pictures/40.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/41.mp4",
          duration: "1:05",
          description: "A love so pure and deep that it feels written in the stars since before time began."
        },
        {
          id: 19,
          season: "S3",
          episode: "E4",
          posterTitle: "DREAMING TOGETHER",
          episodeTitle: "You, Me & Our Little World",
          posterImage: "All videos and Pictures/45.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/42.mp4",
          duration: "1:30",
          description: "Planning our home, our future travels, and growing old holding the same soft hands."
        },
        {
          id: 20,
          season: "S3",
          episode: "E5",
          posterTitle: "MY QUEEN",
          episodeTitle: "Loving You Is My Natural State",
          posterImage: "All videos and Pictures/1.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/43.mp4",
          duration: "1:12",
          description: "You rule my heart with kindness, beauty, and that mischievous little smile."
        },
        {
          id: 21,
          season: "S3",
          episode: "E6",
          posterTitle: "LIFETIME PROMISES",
          episodeTitle: "Meri Sabkuch, Always",
          posterImage: "All videos and Pictures/4.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/46.mp4",
          duration: "1:35",
          description: "I promise to protect your smile, cherish your heart, and be your biggest fan forever."
        },
        {
          id: 22,
          season: "S3",
          episode: "E7",
          posterTitle: "GROWING TOGETHER",
          episodeTitle: "Mera Bacho Ki Maa",
          posterImage: "All videos and Pictures/8.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/47.mp4",
          duration: "1:45",
          description: "Seeing the depth of your soul and knowing you will be the most wonderful mother to our future angels."
        },
        {
          id: 23,
          season: "S3",
          episode: "E8",
          posterTitle: "EVERLASTING STORY",
          episodeTitle: "Our Show Has No Finale ❤️",
          posterImage: "All videos and Pictures/11.jpeg",
          mediaType: "video",
          mediaSource: "All videos and Pictures/48.mp4",
          duration: "1:55",
          description: "This is not the end of the series—it is just the beginning of our forever together."
        }
      ]
    }
  ],

  // ALL 20 PHOTO POLAROIDS (PRESENTED IN THEIR NORMAL FULL SIZES)
  photoMemories: [
    { id: "p-1", title: "My Beautiful Ghali", image: "All videos and Pictures/1.jpeg", note: "The glance that made my heart race" },
    { id: "p-2", title: "Meri Gundi", image: "All videos and Pictures/4.jpeg", note: "My favorite trouble maker" },
    { id: "p-3", title: "Khurat Biwi", image: "All videos and Pictures/8.jpeg", note: "Angry or happy, always gorgeous" },
    { id: "p-4", title: "My Biwi Smiling", image: "All videos and Pictures/9.jpeg", note: "A smile that lights up any room" },
    { id: "p-5", title: "Photobooth Strips", image: "All videos and Pictures/11.jpeg", note: "Forever in my pocket & heart" },
    { id: "p-6", title: "Meri Sabkuch", image: "All videos and Pictures/12.jpeg", note: "My whole entire universe" },
    { id: "p-7", title: "The Cutest Smile", image: "All videos and Pictures/17.jpeg", note: "The love of my life" },
    { id: "p-8", title: "My Everything", image: "All videos and Pictures/18.jpeg", note: "Everything I ever wished for" },
    { id: "p-9", title: "Quiet Moments", image: "All videos and Pictures/19.jpeg", note: "Peace when I am with you" },
    { id: "p-10", title: "Golden Sunshine", image: "All videos and Pictures/20.jpeg", note: "Brighter than any sunny day" },
    { id: "p-11", title: "Sweet Adventures", image: "All videos and Pictures/22.jpeg", note: "Every day with you is a gift" },
    { id: "p-12", title: "Silly Giggles", image: "All videos and Pictures/23.jpeg", note: "Inside jokes and happiness" },
    { id: "p-13", title: "City Lights & You", image: "All videos and Pictures/24.jpeg", note: "Nothing shines like your eyes" },
    { id: "p-14", title: "Endless Warmth", image: "All videos and Pictures/27.jpeg", note: "My comfortable safe space" },
    { id: "p-15", title: "Holding My World", image: "All videos and Pictures/28.jpeg", note: "Never letting this hand go" },
    { id: "p-16", title: "Timeless Memory", image: "All videos and Pictures/31.jpeg", note: "A frozen moment of pure love" },
    { id: "p-17", title: "Sunset Glow", image: "All videos and Pictures/38.jpeg", note: "My queen in the golden light" },
    { id: "p-18", title: "Forever Promises", image: "All videos and Pictures/39.jpeg", note: "Side by side through all of life" },
    { id: "p-19", title: "Soulmate Connection", image: "All videos and Pictures/40.jpeg", note: "Two hearts beating as one" },
    { id: "p-20", title: "To Infinity & Beyond", image: "All videos and Pictures/45.jpeg", note: "Past the stars and back" }
  ]
};

// Flat list of all 23 unique video episodes
CONFIG.allEpisodes = CONFIG.seasons.flatMap(s => s.episodes);
