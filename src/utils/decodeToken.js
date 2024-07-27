export const tokenPayload = (token) => {
    const arrayToken = token.split(".");
    const payload = JSON.parse(atob(arrayToken[1]));
    return payload;
}