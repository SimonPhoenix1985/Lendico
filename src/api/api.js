export default async function fetchApi(url/*, body={}, method='POST'*/){
    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch(e) {
        return false;
    }

}