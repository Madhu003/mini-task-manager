import axios from 'axios';
import constants from "./constants";

const headers =  {
    AuthToken: constants.API_KEY
};

export default class Serivce {

    static getUsers() {
        return axios({
            method: 'get',
            url: constants.BASE_URL + "/listusers",
            headers
        });
    }
    
    static getList() {
        return axios({
            method: 'get',
            url:  constants.BASE_URL + "/list",
            headers
        });
    }

    static addTask(data) {
        return axios({
            method: 'post',
            url:  constants.BASE_URL + "/create",
            headers,
            data
        });
    }
}