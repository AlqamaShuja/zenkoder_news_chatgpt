
const ErrorHandler = (err, page) => {
    console.log(err, "myErrr");
    if(err?.name === 'AxiosError' && err.message === 'Network Error'){
        return 'Network Error';
    }
    else if(err?.response?.data?.error?.name === "ValidationError"){
        return "User validation failed";
    }
    else if(err?.response?.data?.error?.type === "StripeConnectionError"){
        return "Please Check your internet connection";
    }
    else if(err?.response?.data?.message === "User not found"){
        return "User not found";
    }
    else if(err?.response?.data?.message === "Credentials does not match"){
        return "Credentials does not match";
    }

    if(page === "signup"){
        return "SignUp Failed";
    }
    if(page === "signin"){
        return "SignIn Failed";
    }
    return err?.message;
}

export default ErrorHandler;