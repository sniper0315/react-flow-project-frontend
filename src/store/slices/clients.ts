import { createSlice } from '@reduxjs/toolkit';
import { ClientsProps } from 'types/clients';

const initialState: ClientsProps = {
    currentClient: {
        id: '',
        name: { title: '' },
        email: '',
        contactName: '',
        phoneNumber: '',
        date: '',
        links: [],
        providedServices: []
    },
    clientList: []
};

const clients = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setCurrentClient(state, action) {
            state.currentClient = action.payload;
        },
        setClientList(state, action) {
            state.clientList = action.payload;
        },
        addClientToList(state, action) {
            const clientList = [...state.clientList, action.payload];
            state.clientList = clientList;
        }
    }
});

export default clients.reducer;

export const { setCurrentClient, setClientList, addClientToList } = clients.actions;
