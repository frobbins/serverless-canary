export const hello = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello from Lambda!' }),
    };
};

export const preTrafficHook = async () => {
    // Add your logic to perform checks before traffic shifting
    // Throw an error to prevent the deployment if something is wrong
};

export const postTrafficHook = async () => {
    // Add your logic to perform checks after traffic shifting
};
