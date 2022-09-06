export default function authHeader() {
    const userToken = JSON.parse(localStorage.getItem('token')).token || null;
    if (userToken) {
        //
        return { 'x-auth-token': userToken };
    } else {
        return {};
    }
}
