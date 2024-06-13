import { useRegister } from "../hooks/useRegister"


export default function Register() {
    const {signWithGoogle , isPending} = useRegister()

    return (
        <>
            <h1>Register</h1>
            {isPending && <p>Loading...</p>}
            <button onClick={signWithGoogle}>Google</button>
        </>
    )
}
