import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/pages/utils/authorizeAxios'
import { API_ROOT } from '~/pages/utils/constants'


const initialState = {
  currentNotifications: null
}

export const fetchInvitationAPI = createAsyncThunk(
  'notifications/fetchInvitationAPI',
  async () => {
    const response = await authorizeAxiosInstance.get(
      `${API_ROOT}/v1/invitations`
    )

    return response.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ status, invitationId }) => {
    const response = await authorizeAxiosInstance.put(
      `${API_ROOT}/v1/invitations/board/${invitationId}`,
      { status }
    )

    return response.data
  }
)

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },
    addNotification: (state, action) => {
      state.currentNotifications.unshift(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationAPI.fulfilled, (state, action) => {
      let incommingInvitations = action.payload

      state.currentNotifications = Array.isArray(incommingInvitations)
        ? incommingInvitations.reverse()
        : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incommingInvitation = action.payload
      const getInvitation = state.currentNotifications.find(
        (i) => i._id === incommingInvitation._id
      )

      getInvitation.boardInvitation = incommingInvitation.boardInvitation
    })
  }
})

export const {
  clearCurrentNotifications,
  updateCurrentNotifications,
  addNotification
} = notificationSlice.actions

export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications
}

export const notificationReducer = notificationSlice.reducer