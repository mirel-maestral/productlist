import axios from 'axios';

export const getAllProducts = async () => {
	try {
		const response = await axios.get(`https://localhost:5001/api/products`);
		return { data: response.data };
	} catch (e) {
		throw { error: e.response.data };
	}
};

export const getSingleProduct = async (id) => {
	try {
		const response = await axios.get(`https://localhost:5001/api/products/${id}`);
		return { data: response.data };
	} catch (e) {
		throw { error: e.response.data };
	}
};

export const editProduct = async (id, data) => {
	try {
		const response = await axios.put(`https://localhost:5001/api/products/${id}`, data);
		return { data: response.data };
	} catch (e) {
		throw { error: e.response.data };
	}
};
