import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockCourses, mockCategories, mockReviews } from '../../data/mockData';

// Async thunks
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (filters = {}) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredCourses = [...mockCourses];
    
    // Apply filters
    if (filters.category) {
      filteredCourses = filteredCourses.filter(course => course.category === filters.category);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.instructor.name.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.level) {
      filteredCourses = filteredCourses.filter(course => course.level === filters.level);
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filteredCourses = filteredCourses.filter(course => course.price >= min && course.price <= max);
    }
    
    // Apply sorting
    if (filters.sortBy) {
      filteredCourses.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'popularity':
          default:
            return b.studentsCount - a.studentsCount;
        }
      });
    }
    
    return filteredCourses;
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (courseId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    
    return course;
  }
);

export const fetchCourseReviews = createAsyncThunk(
  'courses/fetchCourseReviews',
  async (courseId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockReviews.filter(r => r.courseId === courseId);
  }
);

const initialState = {
  courses: [],
  categories: mockCategories,
  currentCourse: null,
  courseReviews: [],
  isLoading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    level: '',
    priceRange: null,
    sortBy: 'popularity',
  },
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: '',
        level: '',
        priceRange: null,
        sortBy: 'popularity',
      };
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
      state.courseReviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses cases
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch course by ID cases
      .addCase(fetchCourseById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch course reviews cases
      .addCase(fetchCourseReviews.fulfilled, (state, action) => {
        state.courseReviews = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearCurrentCourse } = coursesSlice.actions;
export default coursesSlice.reducer;