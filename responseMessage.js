export const responseMessage = (success, msg = '', data) => {
    return { 
        success,
        msg,
        data
    }
};

