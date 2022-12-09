import { useEffect, RefObject } from 'react'


const useClickOut = (ref: RefObject<HTMLElement>, action: () => void) => {

    useEffect(() => {

        const listener = (e: any) => {
            if (!ref.current?.contains(e.target)) {
                action()
            }
        };

        document.addEventListener("click", listener);

        return () => document.removeEventListener("click", listener);
    }, [action, ref]);

}

export default useClickOut;
