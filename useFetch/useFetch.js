import { useEffect, useRef, useState } from "react"

export const useFetch = ( url ) => {

    const isMounted = useRef(true);
   
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect( () => {

        return () => {
            isMounted.current = false;
        }

    }, [])

    useEffect( () => {

        setState({ loading: true,
            error: null,
            data: null});

        fetch( url )
        .then( resp => resp.json())
        .then( data =>{

            if( isMounted.current )
            {
                setState({
                    loading: false,
                    error: null,
                    data
                })
            }
            //si no se llama
            // else{
            //     console.log('setState no se llamó');
            // }
           
        })
        .catch( () => {
            setState({
                loading: false,
                error: 'No se puedo cargar la data',
                data: null
            })
        })
    }, [url]);

    return state;
}
