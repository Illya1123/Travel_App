import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ExampleState {
  value: number
}

const initialState: ExampleState = {
  value: 0
}

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value = Math.max(0, state.value - 1)
    },
    setValue: (state, action: PayloadAction<number>) => {
      state.value = Math.max(0, action.payload)
    }
  }
})

export const { increment, decrement, setValue } = exampleSlice.actions
export default exampleSlice.reducer
