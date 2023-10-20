const errorResponse = (error) => {
    if(error.response)
        throw error.response.data.message
    throw error.message
}

export default errorResponse;