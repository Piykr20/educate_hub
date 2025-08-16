import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockEnrollments } from '../../data/mockData';

// Async thunks
export const fetchUserEnrollments = createAsyncThunk(
  'enrollment/fetchUserEnrollments',
  async (userId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockEnrollments.filter(e => e.userId === userId);
  }
);

export const enrollInCourse = createAsyncThunk(
  'enrollment/enrollInCourse',
  async ({ userId, courseId }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEnrollment = {
        id: Date.now().toString(),
        userId,
        courseId,
        progress: 0,
        completedLessons: [],
        lastWatched: null,
        enrolledAt: new Date(),
      };
      
      mockEnrollments.push(newEnrollment);
      return newEnrollment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateLessonProgress = createAsyncThunk(
  'enrollment/updateLessonProgress',
  async ({ enrollmentId, lessonId, progress }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const enrollment = mockEnrollments.find(e => e.id === enrollmentId);
    if (enrollment) {
      if (!enrollment.completedLessons.includes(lessonId) && progress >= 90) {
        enrollment.completedLessons.push(lessonId);
      }
      enrollment.lastWatched = lessonId;
      enrollment.progress = Math.min(100, Math.max(enrollment.progress, progress));
    }
    
    return enrollment;
  }
);

const initialState = {
  enrollments: [],
  currentEnrollment: null,
  isLoading: false,
  error: null,
  enrollmentProgress: {},
};

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    setCurrentEnrollment: (state, action) => {
      state.currentEnrollment = action.payload;
    },
    updateProgress: (state, action) => {
      const { enrollmentId, progress } = action.payload;
      state.enrollmentProgress[enrollmentId] = progress;
    },
    markLessonComplete: (state, action) => {
      const { enrollmentId, lessonId } = action.payload;
      const enrollment = state.enrollments.find(e => e.id === enrollmentId);
      if (enrollment && !enrollment.completedLessons.includes(lessonId)) {
        enrollment.completedLessons.push(lessonId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user enrollments cases
      .addCase(fetchUserEnrollments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserEnrollments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enrollments = action.payload;
      })
      .addCase(fetchUserEnrollments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Enroll in course cases
      .addCase(enrollInCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enrollments.push(action.payload);
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update lesson progress cases
      .addCase(updateLessonProgress.fulfilled, (state, action) => {
        const updatedEnrollment = action.payload;
        const index = state.enrollments.findIndex(e => e.id === updatedEnrollment.id);
        if (index !== -1) {
          state.enrollments[index] = updatedEnrollment;
        }
      });
  },
});

export const { setCurrentEnrollment, updateProgress, markLessonComplete } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;