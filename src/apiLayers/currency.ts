import axios from 'axios';
import { API_URL } from '../utils/constants';

export type UpdateCurrencyDetailsRequest = {
    data: Array<{ currency: string; rate: number; ratioSwitch: number; ratio: number }>;
    shopId: string;
};

export type UpdateCurrencyDetailsResponse = {
    status: number;
    message: string;
};

export const updateCurrencyDetails = async (
    request: UpdateCurrencyDetailsRequest
): Promise<UpdateCurrencyDetailsResponse> => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
        throw new Error('JWT not found');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${jwt}`,
        },
    };

    const response = await axios.put(
        `${API_URL}/your-endpoint-here`,
        request,
        config
    );

    return response.data;
};
