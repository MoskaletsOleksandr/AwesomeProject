const postsData = [
  {
    id: 1,
    title: 'Beautiful Sunset',
    image: 'https://via.placeholder.com/500x300',
    location: 'Beach',
    likes: 20,
    comments: [
      {
        id: 1,
        text: 'Amazing view! I wish I could be there.',
        createdAt: '2022-01-01, 09:30:00',
        author: 'Admin',
      },
      {
        id: 2,
        text: 'The colors are so vibrant. Best sunset ever!',
        createdAt: '2022-01-02, 18:45:00',
        author: 'NatureLover',
      },
      {
        id: 3,
        text: 'Stunning! Love the beach.',
        createdAt: new Date('2022-01-03T14:20:00'),
        author: 'Admin',
      },
      {
        id: 4,
        text: 'Wow! Just wow!',
        createdAt: new Date('2022-01-04T10:20:00'),
        author: 'WowFactor',
      },
    ],
  },
  {
    id: 2,
    title: 'Exploring the Mountains',
    image: 'https://via.placeholder.com/500x300',
    location: 'Mountains',
    likes: 25,
    comments: [
      {
        id: 1,
        text: 'Incredible view! Nature at its best.',
        createdAt: new Date('2022-01-03T11:20:00'),
        author: 'Hiker21',
      },
      {
        id: 2,
        text: 'I love hiking in the mountains. So peaceful.',
        createdAt: new Date('2022-01-04T15:10:00'),
        author: 'Admin',
      },
      {
        id: 3,
        text: 'Wish I could be there right now!',
        createdAt: new Date('2022-01-04T20:30:00'),
        author: 'AdventureSeeker',
      },
      {
        id: 4,
        text: 'Breath-taking!',
        createdAt: new Date('2022-01-05T08:45:00'),
        author: 'Admin',
      },
      {
        id: 5,
        text: 'This view is worth the hike!',
        createdAt: new Date('2022-01-05T14:15:00'),
        author: 'HikeForLife',
      },
    ],
  },
  {
    id: 3,
    title: 'City Adventures',
    image: 'https://via.placeholder.com/500x300',
    location: 'City',
    likes: 40,
    comments: [
      {
        id: 1,
        text: 'The city lights are mesmerizing at night.',
        createdAt: new Date('2022-01-05T20:55:00'),
        author: 'Admin',
      },
      {
        id: 2,
        text: 'So many things to explore in the city!',
        createdAt: new Date('2022-01-06T14:30:00'),
        author: 'UrbanExplorer',
      },
      {
        id: 3,
        text: 'The city skyline is simply breathtaking.',
        createdAt: new Date('2022-01-06T18:20:00'),
        author: 'SkylineLover',
      },
      {
        id: 4,
        text: 'I love the city vibes!',
        createdAt: new Date('2022-01-07T09:10:00'),
        author: 'Admin',
      },
      {
        id: 5,
        text: "Can't get enough of the city life!",
        createdAt: new Date('2022-01-07T15:45:00'),
        author: 'CityAdventurer',
      },
      {
        id: 6,
        text: 'The city that never sleeps!',
        createdAt: new Date('2022-01-08T12:30:00'),
        author: 'Admin',
      },
    ],
  },
  {
    id: 4,
    title: 'Serene Forest',
    image: 'https://via.placeholder.com/500x300',
    location: 'Forest',
    likes: 13,
    comments: [
      {
        id: 1,
        text: 'Walking through the forest is so calming.',
        createdAt: new Date('2022-01-07T16:45:00'),
        author: 'NatureWalker',
      },
      {
        id: 2,
        text: 'The fresh air in the forest is invigorating.',
        createdAt: new Date('2022-01-08T10:20:00'),
        author: 'Admin',
      },
      {
        id: 3,
        text: 'I could spend hours in this forest!',
        createdAt: new Date('2022-01-08T14:15:00'),
        author: 'NatureAdmirer',
      },
      {
        id: 4,
        text: 'Feels like being in a fairytale!',
        createdAt: new Date('2022-01-09T09:30:00'),
        author: 'Admin',
      },
    ],
  },
  {
    id: 5,
    title: 'Sunrise on the Lake',
    image: 'https://via.placeholder.com/500x300',
    location: 'Lake',
    likes: 21,
    comments: [
      {
        id: 1,
        text: 'The sunrise over the lake is breathtaking.',
        createdAt: new Date('2022-01-09T07:15:00'),
        author: 'Admin',
      },
      {
        id: 2,
        text: 'Early morning reflections on the lake are so peaceful.',
        createdAt: new Date('2022-01-10T09:10:00'),
        author: 'ReflectionLover',
      },
      {
        id: 3,
        text: 'Wish I could wake up to this view every day!',
        createdAt: new Date('2022-01-10T12:30:00'),
        author: 'Admin',
      },
      {
        id: 4,
        text: 'This lake is my happy place!',
        createdAt: new Date('2022-01-11T08:20:00'),
        author: 'LakeLover',
      },
      {
        id: 5,
        text: 'The lake always brings me peace.',
        createdAt: new Date('2022-01-11T15:00:00'),
        author: 'Admin',
      },
      {
        id: 6,
        text: 'I could sit here for hours and never get tired of it.',
        createdAt: new Date('2022-01-12T11:45:00'),
        author: 'LakeSerenity',
      },
    ],
  },
];

export default postsData;
