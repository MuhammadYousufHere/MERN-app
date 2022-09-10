export default function authHeader() {
    const userToken = JSON.parse(localStorage.getItem('token'));
    if (userToken) {
        //
        return { 'x-auth-token': userToken.token };
    } else {
        return {};
    }
}
