const token = localStorage.getItem('token');
const username = localStorage.getItem('username');
export default {
  store: {
    username: username || '游客',
    token: token || '',
    is_admin: false,
  }
}