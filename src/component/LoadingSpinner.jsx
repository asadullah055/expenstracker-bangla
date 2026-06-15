const LoadingSpinner = ({ message = "লোড হচ্ছে..." }) => {
    return (
        <div className="card flex min-h-64 flex-col items-center justify-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
            <p className="text-sm font-medium text-gray-600">{message}</p>
        </div>
    );
};

export default LoadingSpinner;
