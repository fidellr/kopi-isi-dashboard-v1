import axios from "axios";
import moment from 'moment';
import { INGREDIENTS_URL, FINAL_HPP_URL } from "./constants";

export const fetchAllIngredients = async () => {
    try {
        const { data } = await axios.get(INGREDIENTS_URL);
        return data.map(item => {
            item.created_at = moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')
            item.updated_at = moment(item.updated_at).format('MMMM Do YYYY, h:mm:ss a')
            return item
        });
    } catch (err) {
        console.log(err)
    }
}
export const getIngredientByID = async (id) => {
    try {
        const { data } = await axios.get(INGREDIENTS_URL + `/${id}`);
        return data.map(item => {
            item.created_at = moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')
            item.updated_at = moment(item.updated_at).format('MMMM Do YYYY, h:mm:ss a')
            return item
        });
    } catch (err) {
        console.log(err)
    }
}
export const updateIngredient = async (id, payload) => {
    try {
        const { data } = await axios.put(INGREDIENTS_URL + `/${id}`, payload);
        return data
    } catch (err) {
        console.log(err)
    }
}
export const deleteIngredient = async (id) => {
    try {
        const { data } = await axios.delete(INGREDIENTS_URL + `/${id}`);
        return data
    } catch (err) {
        console.log(err)
    }
}


export const fetchAllHPPCalc = async () => {
    try {
        const { data } = await axios.get(FINAL_HPP_URL);
        return data.map(item => {
            item.created_at = moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')
            item.updated_at = moment(item.updated_at).format('MMMM Do YYYY, h:mm:ss a')
            return item
        });

    } catch (err) {
        console.log(err)
    }
}
export const getHPPCalcByID = async (id) => {
    try {
        const { data } = await axios.get(FINAL_HPP_URL + `/${id}`);
        return data.map(item => {
            item.created_at = moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')
            item.updated_at = moment(item.updated_at).format('MMMM Do YYYY, h:mm:ss a')
            return item
        });
    } catch (err) {
        console.log(err)
    }
}
export const updateHPPCalc = async (id, payload) => {
    try {
        const { data } = await axios.put(FINAL_HPP_URL + `/${id}`, payload);
        return data
    } catch (err) {
        console.log(err)
    }
}
export const deleteHPPCalc = async (id) => {
    try {
        const { data } = await axios.delete(FINAL_HPP_URL + `/${id}`);
        return data
    } catch (err) {
        console.log(err)
    }
}