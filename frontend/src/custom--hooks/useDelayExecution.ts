import React from 'react';

function useDelayExecution(
    callback: () => Promise<void>,
    delayTime: number = 1000,
    finallyCallback?: () => void,
    errorCallback?: (e: any) => void,
) {
    let typingTimer;

    const ref = React.useRef<any>(null);

    const delayFunc = () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(async () => {
            try {
                await callback();
            } catch (e) {
                if (errorCallback) {
                    errorCallback(e);
                }
            } finally {
                if (finallyCallback) {
                    finallyCallback();
                }
            }
        }, delayTime);
    };

    React.useEffect(() => {
        if (ref && !ref.current) return;
        ref.current.addEventListener('keyup', delayFunc);
        return () => {
            if (ref && !ref.current) return;
            ref.current.removeEventListener('keyup', delayFunc);
            clearTimeout(typingTimer);
        };
    }, [ref, callback]);

    return [ref];
}

export default useDelayExecution;
