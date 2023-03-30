import axios from "axios";

const Api = axios.create({
    baseURL:"https://cherryco.onrender.com"
})

export default Api