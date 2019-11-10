export const responseMessage = (success=false, msg='', data=null) => {
    return {
        success,
        msg,
        data
    }
}