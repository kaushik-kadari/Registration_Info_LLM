import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sendCopy, setSendCopy] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here, like sending the data to an API
        console.log('Form submitted:', { name, email, message, sendCopy });
        // Reset form
        setName('');
        setEmail('');
        setMessage('');
        setSendCopy(false);
    };

    return (
        <div className="contact-wrapper">
             <div className="w-full max-w-md contact-bg p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <input
                            type="text"
                            className="peer block w-full px-4 py-2 bg-transparent border text-white border-gray-300 rounded-md outline-none transition duration-200 ease-linear focus:border-blue-500"
                            id="name"
                            placeholder=" "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label
                            htmlFor="name"
                            className={`absolute left-3 top-2 transition-all duration-200 ease-out text-gray-500 ${
                                name ? '-top-3.5 text-xs text-blue-500' : ''
                            } peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-blue-500`}
                        >
                            Name
                        </label>
                    </div>

                    <div className="mb-4 relative">
                        <input
                            type="email"
                            className="peer block w-full px-4 py-2 bg-transparent border border-gray-300 rounded-md outline-none transition duration-200 ease-linear focus:border-blue-500"
                            id="email"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                            htmlFor="email"
                            className={`absolute left-3 top-2 transition-all duration-200 ease-out text-gray-500 ${
                                email ? '-top-3.5 text-xs text-blue-500' : ''
                            } peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-blue-500`}
                        >
                            Email address
                        </label>
                    </div>

                    <div className="mb-4 relative">
                        <textarea
                            className="peer block w-full px-4 py-2 bg-transparent border border-gray-300 rounded-md outline-none transition duration-200 ease-linear focus:border-blue-500"
                            id="message"
                            rows="4"
                            placeholder=" "
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <label
                            htmlFor="message"
                            className={`absolute left-3 top-2 transition-all duration-200 ease-out text-gray-500 ${
                                message ? '-top-3.5 text-xs text-blue-500' : ''
                            } peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-blue-500`}
                        >
                            Message
                        </label>
                    </div>

                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            id="sendCopy"
                            checked={sendCopy}
                            onChange={(e) => setSendCopy(e.target.checked)}
                        />
                        <label htmlFor="sendCopy" className="ml-2 text-gray-500">
                            Send me a copy of this message
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
