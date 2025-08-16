import { useSelector, useDispatch } from 'react-redux';

// Custom hooks for better type safety and convenience
export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();

// Specific selector hooks
export const useAuth = () => {
  return useAppSelector((state) => state.auth);
};

export const useTheme = () => {
  return useAppSelector((state) => state.theme);
};

export const useCourses = () => {
  return useAppSelector((state) => state.courses);
};

export const useEnrollment = () => {
  return useAppSelector((state) => state.enrollment);
};

export const useUI = () => {
  return useAppSelector((state) => state.ui);
};