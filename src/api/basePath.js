import axios from 'axios';
import { basePath } from './apiConfig';

export default axios.create({
	baseURL: basePath,
	headers: {
		"Content-type": "application/json"
	}
})