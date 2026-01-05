import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 z-10 animate-scale-in border border-orange-100">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-orange-600 transition-colors duration-300 hover:rotate-90"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="flex items-center justify-end gap-3 p-6 border-t border-orange-100 bg-gray-50">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
