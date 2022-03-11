import httpService from "./http.service";
import localStorageService from "./localStorage.service";
const userEndPoint = "user/";

const userService = {
    create: async (content) => {
        const { data } = await httpService.put(
            userEndPoint + content._id,
            content
        );
        return data;
    },
    update: async (updateData) => {
        const { data } = await httpService.put(
            userEndPoint + localStorageService.getUserId(),
            updateData
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndPoint + localStorageService.getUserId()
        );
        return data;
    }
};

export default userService;
