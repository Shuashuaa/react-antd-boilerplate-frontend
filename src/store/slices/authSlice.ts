import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser, signOut, fetchAuthSession } from 'aws-amplify/auth';

export interface AuthState {
  user: { username: string; email?: string } | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

export const fetchUserSession = createAsyncThunk('auth/fetchUserSession',async (_, thunkAPI) => {
    try {
        const user = await getCurrentUser();
        const session = await fetchAuthSession();

        const accessToken = session.tokens?.accessToken?.toString() || null;
        const idToken = session.tokens?.idToken?.toString() || null;
           
        console.log('--------- accessToken ---------')
        console.log(accessToken) //
        console.log('--------- idToken ---------')
        console.log(idToken) //

        return {
            username: user.username,
            email: user.signInDetails?.loginId,
            accessToken,
            idToken
        };
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  try {
    await signOut();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { 
            username: action.payload.username, 
            email: action.payload.email 
        };
        state.accessToken = action.payload.accessToken;
      })
      .addCase(fetchUserSession.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
