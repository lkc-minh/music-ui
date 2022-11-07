import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { AiOutlineUser } from "react-icons/ai";
import { BsKeyboard } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";
import { toast } from "react-toastify";
import Modal from "~/components/Modal/Modal";
import { auth } from "~/firebase";
import "./Login.scss";

const inputLogin = [
    {
        type: "text",
        name: "email",
        placeholder: "Email",
        icon: <FiMail className="Login-icon" />,
    },
    {
        type: "password",
        name: "password",
        placeholder: "Password",
        icon: <BsKeyboard className="Login-icon" />,
    },
];

function Login({ isOpen, setIsOpen, setIsOpenSignUp }) {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;
        // const email = e.target[]
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                // const user = userCredential.user;
                toast.success("Sign in successfully");
                setIsOpen(false);
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage + " (" + error.code + ")");
            });
    };

    const handleLoginGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);

            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            toast.success("Sign up successfully");
            setIsOpen(false);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            toast.error(error.message);
        }
    };

    const handleLoginFb = async () => {
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // ...
            // ...
            toast.success("Sign up successfully");
            setIsOpen(false);
        } catch (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
            toast.error(error.message);
        }
    };
    return (
        <Modal open={isOpen} setOpen={setIsOpen}>
            <div className="Login">
                <div className="Login__top">
                    <h3>Sign In</h3>
                    <button onClick={() => setIsOpen(false)}>
                        <TfiClose />
                    </button>
                </div>
                <div className="Login__content">
                    <form action="" className="Login__content-form" onSubmit={handleSubmit}>
                        {inputLogin.map((item) => (
                            <div className="Login__content-form-item" key={item.name}>
                                {item.icon}
                                <input type={item.type} placeholder={item.placeholder} />
                            </div>
                        ))}

                        <div className="Login__content-form-checkbox">
                            <input id="remember" type="checkbox" />
                            <label htmlFor="remember">Remember</label>
                        </div>

                        <button type="submit">Sign In</button>
                    </form>
                    <div className="Login__content-options">
                        <p>
                            Or sign in via:{" "}
                            <button onClick={handleLoginFb}>
                                <FaFacebook />
                            </button>{" "}
                            <button onClick={handleLoginGoogle}>
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAixJREFUOE+tlL9vUlEUx7/nvopgotCYaBhMSYzON/6YtHhZ3BppdKkORRMXl9bNxQhN/4CuTi1DdWplcEKTXqKDi/DqqonoYLWLPEIoNOUdcx/y+qBgGLzjyff7Oefce84lDDk7SipAzAOUAEF5EuYqAA24+bi29aCNgoEdJROAteqbh2XxoNAWOo/PaNvuSXzQrpLyAGKLiGKj/P1xLsW3yt1qAXig30rG9iC+DkIYvA0m0xKIWAI01S2ItyPsqklt1/pAP9TlAhFuBTI6gpE5qz8WBlpXIJENs5sOQrxE+0XI1qfTlebbc+C2ZWKOxR0V7H+cVg1ohQkLnZ8RNDbOo1ML3Y/r8to45qCGWkVoItzwem9Z9fBMJzoISeacLAR4FNyFKFH7zaGAGaXwzb9zE3All5yRkO6MIff/QMHWmq71JdWcuWrPFvxnNQnHq6iINRDmPx9E8chJosHHcuW5zey/Lnt6qZ4h8GpPw0Sz3vO/bk9VlhtXuu0y15jdlH2v4I9/EKqyHHPJqYAo0YsL99SkN9mXXtxeAWHBz2BgoEX77kY+CJEv76gT3588n2hfuHioRf7ds2jGA8lX6ZhoWWYV+p6eYTaeqsSoMZAggjT60K8HCNWvm/qdffe4/JCNVP2lletpKYRlvocjczTsvibq1xDafZh6//Sk96X0fSOmMtoTBSLyBnTUYeZvzG46eI99oJ7RVEfCWgRzogc1ZhBpBmt7bvPICv0BIUjuZjOL37cAAAAASUVORK5CYII="
                                    alt=""
                                    style={{ padding: "4px 6px" }}
                                />
                            </button>
                        </p>
                    </div>
                    <div className="Login__content-more">
                        You don't have NCT ID account?{" "}
                        <span
                            onClick={() => {
                                setIsOpen(false);
                                setIsOpenSignUp(true);
                            }}
                        >
                            Sign up now
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default Login;
