export const mockCategories = [
  { id: '1', name: 'Programming', icon: '💻', courseCount: 245 },
  { id: '2', name: 'Design', icon: '🎨', courseCount: 158 },
  { id: '3', name: 'Business', icon: '📊', courseCount: 192 },
  { id: '4', name: 'Marketing', icon: '📢', courseCount: 134 },
  { id: '5', name: 'Photography', icon: '📷', courseCount: 89 },
  { id: '6', name: 'Music', icon: '🎵', courseCount: 67 },
];

export const mockCourses = [
  {
    id: '1',
    title: 'Complete React Developer Course',
    description: 'Master React development from basics to advanced concepts including hooks, context, and state management.',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.8,
    studentsCount: 12543,
    duration: '42h 30m',
    level: 'Intermediate',
    category: 'Programming',
    instructor: {
      id: '2',
      name: 'Jane Instructor',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lessons: [
      {
        id: '1',
        title: 'Introduction to React',
        duration: '15:30',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description: 'Learn the fundamentals of React and its ecosystem',
        order: 1,
      },
      {
        id: '2',
        title: 'Components and JSX',
        duration: '22:15',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description: 'Deep dive into React components and JSX syntax',
        order: 2,
      },
      {
        id: '3',
        title: 'State and Props',
        duration: '28:45',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description: 'Understanding state management and props in React',
        order: 3,
      },
    ],
    createdAt: new Date('2024-01-10'),
    isPublished: true,
  },
  {
    id: '2',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and user experience design with hands-on projects.',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 69.99,
    originalPrice: 149.99,
    rating: 4.6,
    studentsCount: 8932,
    duration: '28h 15m',
    level: 'Beginner',
    category: 'Design',
    instructor: {
      id: '2',
      name: 'Jane Instructor',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lessons: [
      {
        id: '4',
        title: 'Design Thinking Process',
        duration: '18:20',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description: 'Introduction to design thinking methodology',
        order: 1,
      },
      {
        id: '5',
        title: 'User Research Methods',
        duration: '25:10',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description: 'Learn various user research techniques',
        order: 2,
      },
    ],
    createdAt: new Date('2024-01-05'),
    isPublished: true,
  },
  {
    id: '3',
    title: 'Digital Marketing Mastery',
    description: 'Comprehensive course covering SEO, social media marketing, content creation, and analytics.',
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 79.99,
    originalPrice: 179.99,
    rating: 4.7,
    studentsCount: 15670,
    duration: '35h 45m',
    level: 'Intermediate',
    category: 'Marketing',
    instructor: {
      id: '2',
      name: 'Jane Instructor',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lessons: [
      {
        id: '6',
        title: 'Digital Marketing Overview',
        duration: '20:30',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description: 'Introduction to digital marketing landscape',
        order: 1,
      },
    ],
    createdAt: new Date('2023-12-20'),
    isPublished: true,
  },
  {
    id: '4',
    title: 'Photography for Beginners',
    description: 'Learn the art of photography from camera basics to composition and lighting techniques.',
    thumbnail: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 59.99,
    originalPrice: 129.99,
    rating: 4.9,
    studentsCount: 6789,
    duration: '24h 20m',
    level: 'Beginner',
    category: 'Photography',
    instructor: {
      id: '2',
      name: 'Jane Instructor',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lessons: [
      {
        id: '7',
        title: 'Camera Basics',
        duration: '16:45',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description: 'Understanding your camera and its settings',
        order: 1,
      },
    ],
    createdAt: new Date('2023-12-15'),
    isPublished: true,
  },
];

export const mockReviews = [
  {
    id: '1',
    userId: '1',
    courseId: '1',
    rating: 5,
    comment: 'Excellent course! Very comprehensive and well-structured. The instructor explains complex concepts in a simple way.',
    userName: 'John Student',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    userId: '1',
    courseId: '1',
    rating: 4,
    comment: 'Great content and practical examples. Would recommend to anyone starting with React.',
    userName: 'Sarah Wilson',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2024-01-18'),
  },
];

export const mockEnrollments = [
  {
    id: '1',
    userId: '1',
    courseId: '1',
    progress: 45,
    completedLessons: ['1', '2'],
    lastWatched: '2',
    enrolledAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    userId: '1',
    courseId: '2',
    progress: 20,
    completedLessons: ['4'],
    lastWatched: '4',
    enrolledAt: new Date('2024-01-12'),
  },
];

export const mockTeachers = [
  {
    id: '2',
    name: 'Jane Instructor',
    email: 'instructor@example.com',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Experienced software developer and educator with 8+ years in web development. Passionate about teaching modern JavaScript frameworks and best practices.',
    qualifications: [
      'M.S. Computer Science - Stanford University',
      'Certified React Developer',
      'AWS Solutions Architect',
      '8+ years industry experience'
    ],
    specializations: ['React', 'JavaScript', 'Node.js', 'Web Development'],
    rating: 4.8,
    totalStudents: 25000,
    totalCourses: 12,
    yearsExperience: 8,
    courses: ['1', '2'], // Course IDs
    socialLinks: {
      linkedin: 'https://linkedin.com/in/janeinstructor',
      twitter: 'https://twitter.com/janeinstructor',
      github: 'https://github.com/janeinstructor'
    }
  },
  {
    id: '4',
    name: 'Dr. Michael Chen',
    email: 'michael@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Data Science expert and machine learning researcher. Former Google AI researcher with expertise in deep learning and artificial intelligence.',
    qualifications: [
      'Ph.D. Machine Learning - MIT',
      'Former Google AI Researcher',
      'Published 50+ research papers',
      '10+ years in AI/ML'
    ],
    specializations: ['Machine Learning', 'Data Science', 'Python', 'AI'],
    rating: 4.9,
    totalStudents: 18000,
    totalCourses: 8,
    yearsExperience: 10,
    courses: ['3'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/michaelchen',
      twitter: 'https://twitter.com/drmichaelchen'
    }
  },
  {
    id: '5',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Professional photographer and visual artist with expertise in portrait, landscape, and commercial photography. Award-winning photographer.',
    qualifications: [
      'B.F.A. Photography - Art Institute',
      'Adobe Certified Expert',
      'Award-winning photographer',
      '12+ years professional experience'
    ],
    specializations: ['Photography', 'Adobe Photoshop', 'Lightroom', 'Visual Arts'],
    rating: 4.7,
    totalStudents: 15000,
    totalCourses: 6,
    yearsExperience: 12,
    courses: ['4'],
    socialLinks: {
      instagram: 'https://instagram.com/sarahwilliamsphoto',
      website: 'https://sarahwilliamsphoto.com'
    }
  }
];

export const mockCourseContent = [
  {
    id: '1',
    courseId: '1',
    instructorId: '2',
    videos: [
      {
        id: 'v1',
        title: 'Introduction to React',
        description: 'Learn the fundamentals of React and its ecosystem',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: '15:30',
        order: 1,
        uploadedAt: new Date('2024-01-10')
      },
      {
        id: 'v2',
        title: 'Components and JSX',
        description: 'Deep dive into React components and JSX syntax',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        duration: '22:15',
        order: 2,
        uploadedAt: new Date('2024-01-11')
      }
    ],
    resources: [
      {
        id: 'r1',
        title: 'React Fundamentals Cheat Sheet',
        description: 'Quick reference guide for React basics',
        type: 'pdf',
        url: '#',
        size: '2.5 MB',
        uploadedAt: new Date('2024-01-10')
      },
      {
        id: 'r2',
        title: 'Component Examples',
        description: 'Sample React components for practice',
        type: 'pdf',
        url: '#',
        size: '1.8 MB',
        uploadedAt: new Date('2024-01-11')
      }
    ]
  }
];