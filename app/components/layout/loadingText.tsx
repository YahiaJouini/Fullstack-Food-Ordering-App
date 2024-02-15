const LoadinSpinner = () => {
    return (
        <div className="h-[600px] w-full flex flex-col gap-y-3 items-center justify-center">
            <h1 className="text-2xl font-extrabold">Please wait a moment.</h1>
            <h1>Checking for existing account information...</h1>
        </div>
    )
}

export default LoadinSpinner