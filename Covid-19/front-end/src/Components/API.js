import axios from 'axios';

const fetchData = axios.create({
    baseURL: `https://api.covid19api.com`
});

export default fetchData;
