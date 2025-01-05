
export const DownvoteSvgComponent = ({fill,className}:{fill?:string,className?:string}) => {
    return (
        <>
            {/* Downvote Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={fill===undefined?"none":fill}
                className={`w-5 h-5 ${className}`}
            >
                <path
                    d="M12 21l-5.7-5.7c-.6-.6-.2-1.7.7-1.7h3V6a1 1 0 011-1h2a1 1 0 011 1v8h3c.9 0 1.3 1.1.7 1.7L12 21z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </svg>

        </>
    );
};