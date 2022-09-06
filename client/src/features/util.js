export default function authHeader() {
    const userToken = JSON.parse(localStorage.getItem('token'));
    console.log(userToken, 'kkkk');
    if (userToken) {
        //
        return { 'x-auth-token': userToken };
    } else {
        return {};
    }
}
