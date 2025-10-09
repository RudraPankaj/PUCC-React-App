import React from 'react';

const AlertModal = ({ show, type, message, onClose }) => {
    if (!show) return null;

    const isError = type === 'error';
    const borderColor = isError ? 'border-red-500' : 'border-green-500';
    const bgColor = isError ? 'bg-red-50' : 'bg-green-50';
    const textColor = isError ? 'text-red-700' : 'text-green-700';
    const title = isError ? 'Operation Failed' : 'Success!';

    // Bootstrap Icon definitions
    const icon = isError ? (
        <i className="bi bi-x-circle-fill text-2xl"></i>
    ) : (
        <i className="bi bi-check-circle-fill text-2xl"></i>
    );

    // Function to close the modal when clicking outside the content area
    const handleBackdropClick = (e) => {
        if (e.target.id === 'modal-backdrop') {
            onClose();
        }
    };

    return (
        <div 
            id="modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm p-4"
            onClick={handleBackdropClick}
        >
            {/* Modal Content */}
            <div 
                role="alert"
                className={`w-full max-w-md p-6 rounded-xl shadow-2xl ${bgColor} border-t-4 ${borderColor} transform transition-all duration-300 scale-100`}
            >
                <div className="flex items-start">
                    {/* Icon Area */}
                    <div className="flex-shrink-0 mr-3 mt-0.5">
                        <div className={`p-1.5 rounded-full ${isError ? 'bg-red-200' : 'bg-green-200'} ${textColor}`}>
                            {icon}
                        </div>
                    </div>
                    {/* Message Area */}
                    <div className="flex-grow">
                        <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>{title}</h3>
                        <p className={`text-sm ${textColor} opacity-90`}>{message}</p>
                    </div>
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className={`ml-4 -mt-1 -mr-1 p-2 rounded-full hover:bg-opacity-50 transition-colors ${textColor} hover:${isError ? 'bg-red-200' : 'bg-green-200'}`}
                        aria-label="Close alert"
                    >
                        <i className="bi bi-x-lg text-base"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;