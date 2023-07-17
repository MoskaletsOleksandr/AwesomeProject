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
        createdAt: new Date('2022-01-01T09:30:00'),
      },
      {
        id: 2,
        text: 'The colors are so vibrant. Best sunset ever!',
        createdAt: new Date('2022-01-02T18:45:00'),
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
      },
      {
        id: 2,
        text: 'I love hiking in the mountains. So peaceful.',
        createdAt: new Date('2022-01-04T15:10:00'),
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
      },
      {
        id: 2,
        text: 'So many things to explore in the city!',
        createdAt: new Date('2022-01-06T14:30:00'),
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
      },
      {
        id: 2,
        text: 'The fresh air in the forest is invigorating.',
        createdAt: new Date('2022-01-08T10:20:00'),
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
      },
      {
        id: 2,
        text: 'Early morning reflections on the lake are so peaceful.',
        createdAt: new Date('2022-01-10T09:10:00'),
      },
    ],
  },
];

export default postsData;
