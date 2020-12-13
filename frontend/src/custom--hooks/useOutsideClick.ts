import React from 'react';

function useOutsideClick(when, ref: React.RefObject<any> | React.RefObject<any>[], callback, elementsToIgnore?: string[]) {
    const handleClickOutside = (event) => {
        // check if clicked element lives in ignored one
        const isChildOfIgnored = elementsToIgnore?.some((item) => {
            console.log(item);
            console.log(event.target);
            return event.target.closest(item);
        });

        if (Array.isArray(ref)) {
            const result = ref.every((refObject) =>
                refObject.current && !refObject.current.contains(event.target) && !isChildOfIgnored);
            if (result) {
                callback();
            }
            return;
        }

        if (ref.current && !ref.current.contains(event.target) && !isChildOfIgnored) {
            callback();
        }
    };

    React.useEffect(() => {
        if (!when) return;
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, when, callback]);
}

export default useOutsideClick;
