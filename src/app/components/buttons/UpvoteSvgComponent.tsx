export const UpvoteSvgComponent = ({fill,className}:{fill?:string,className?:string}) => {
    return (
        <>
            {/* Upvote Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={fill===undefined?"none": fill}
                className={`w-5 h-5  ${className}`}
            >
                <path
                    d="M12 3l5.7 5.7c.6.6.2 1.7-.7 1.7H14v8a1 1 0 01-1 1H11a1 1 0 01-1-1v-8H7c-.9 0-1.3-1.1-.7-1.7L12 3z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"

                />
            </svg>
        </>
    );
};