function ErrorMessage({ message }) {
    if (!message) return null;
    return (
        <div className="text-red-600 bg-red-50 p-2">
            {message}
        </div>
    );
}

export default ErrorMessage;