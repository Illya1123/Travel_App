import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa cấu trúc dữ liệu của tour
interface Tour {
  _id: string; // Thêm _id vào interface
  title: string;
  image: string;
  score: string;
  score_description: string;
  price: number;
  date: string;
  services: string[];
  overview: string[];
  type: 'Tour Nước Ngoài' | 'Tour Trong Nước';
  country: string;
}

// Trạng thái ban đầu của tour
interface TourState {
  tours: Tour[];
}

const initialState: TourState = {
  tours: [],
};

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    // Thêm hoặc cập nhật danh sách các tour
    setTours: (state, action: PayloadAction<Tour[]>) => {
      const tourData = action.payload;

      // Lưu thông tin các tour vào AsyncStorage
      AsyncStorage.setItem('tourData', JSON.stringify(tourData));

      state.tours = tourData;
    },

    // Thêm một tour mới vào danh sách
    addTour: (state, action: PayloadAction<Tour>) => {
      const newTour = action.payload;
      state.tours.push(newTour);

      // Cập nhật AsyncStorage
      AsyncStorage.setItem('tourData', JSON.stringify(state.tours));
    },

    // Xóa tour theo tiêu đề (hoặc có thể dùng ID nếu có)
    removeTour: (state, action: PayloadAction<string>) => {
      const tourTitle = action.payload;
      state.tours = state.tours.filter((tour) => tour.title !== tourTitle);

      // Cập nhật AsyncStorage
      AsyncStorage.setItem('tourData', JSON.stringify(state.tours));
    },

    // Xóa toàn bộ tour (nếu cần thiết)
    clearTours: (state) => {
      state.tours = [];

      // Xóa khỏi AsyncStorage
      AsyncStorage.removeItem('tourData');
    },
  },
});

export const { setTours, addTour, removeTour, clearTours } = tourSlice.actions;
export default tourSlice.reducer;
