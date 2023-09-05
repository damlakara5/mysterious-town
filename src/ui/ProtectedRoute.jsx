import { styled } from "styled-components"
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

function ProtectedRoute({children}) {
    const navigate = useNavigate()
    //load auth user
    const { isLoading, isAuthenticated} = useUser()


    //if there is no auth user redirect to login
    useEffect(() => {
       if(!isAuthenticated && !isLoading) navigate("/login")
    }, [isLoading, isAuthenticated, navigate ])

    
    //show spinner
    if(isLoading) return <FullPage><Spinner /></FullPage>

    
    //if there is a user render the app
    if(isAuthenticated)  return children
}

export default ProtectedRoute
