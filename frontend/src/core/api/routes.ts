export const Routes = {
    testGetWithoutAuth: () => '/api/auth/get/test-without-auth',
    testGetWithAuth: () => '/api/auth/get/test-with-auth',
    loginFacebookPost: () => '/api/auth/login/facebook',
    createUser: () => '/api/auth/signup',
    login: (token: boolean) => (token ? '/api/auth/login/token' : '/api/auth/login'),
    changePassword: () => '/api/users/change-password',
    room: (roomId?: string) => (roomId ? `/api/rooms/${roomId}` : '/api/rooms'),
    users: (param?: string) => (param ? `/api/users/${param}` : '/api/users'),
    uploadAvatar: () => '/api/upload/users',
    uploadRoomImage: (roomId: string) => `/api/upload/rooms/${roomId}`,
};
