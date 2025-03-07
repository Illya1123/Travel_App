import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  uid: string;
  email: string;
  name: string;
  token: string;
  avatar: string;
}

const initialState: UserState = {
  uid: '',
  email: '',
  name: '',
  token: '',
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const userData = action.payload;

      // Lưu thông tin người dùng vào AsyncStorage
      AsyncStorage.setItem('userToken', userData.token);
      AsyncStorage.setItem('userData', JSON.stringify(userData));

      return userData;
    },
    clearUser: () => {
      // Xóa thông tin người dùng khỏi AsyncStorage khi đăng xuất
      AsyncStorage.removeItem('userToken');
      AsyncStorage.removeItem('userData');
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
