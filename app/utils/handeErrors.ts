const HandleErrors = (err: any) => {
    let errors: any = {
        email: "",
        password: ""
    }
    Object.values(err.errors).forEach((error: any) => {
        errors[error.properties.path] = error.properties.message
    })

    return errors
}
export default HandleErrors