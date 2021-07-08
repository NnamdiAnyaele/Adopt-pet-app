import { useState, useEffect } from 'react'

const localcache = [];

export default function useBreedList(animal) {
    const [breedList, setbreedList] = useState([])
    const [status, setStatus] = useState('unloaded')

    useEffect(() => {
        if (!animal) {
            setbreedList([])
        } else if (localcache[animal]) {
            setbreedList(localcache[animal])
        } else {
            requestBreedList(breedList)
        }
        async function requestBreedList () {
            setbreedList([])
            setStatus('loading')
    
            const res = await fetch(
                `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
            )
            const json = await res.json()
            localcache[animal] = json.breeds || [];
            setbreedList(localcache[animal])
            setStatus('loaded')
        }
    }, [animal]
    )
    
    return [breedList, status]
}