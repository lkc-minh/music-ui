import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsKeyboard } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";

import Modal from "~/components/Modal/Modal";
import "./Login.scss";

const inputLogin = [
    {
        type: "text",
        name: "username",
        placeholder: "Username",
        icon: <AiOutlineUser className="Login-icon" />,
    },
    {
        type: "password",
        name: "password",
        placeholder: "Password",
        icon: <BsKeyboard className="Login-icon" />,
    },
];

function Login({ isOpen, setIsOpen, setIsOpenSignUp }) {
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
                    <form action="" className="Login__content-form">
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
                            <button>
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAyCAYAAAAayliMAAAABHNCSVQICAgIfAhkiAAABKJJREFUaEPtWE2IW1UU/s4dnDiLLpyMLqoLQcFKEkSkijiuqlARBcVJkIKOP2B36sJNRW0VXQjSLnWhVgVLUn/wX6SzKqI4CIXM1A4qrpyFJqO0i5kMeD857+Ummfhe3n2Zl8pAZhXm3nfO+c7fd84V7PA/2eH2Ywzg/47gOALjCGzTA+MUinNgobp2G4Bpd75cmf5sm86O/DyzCKjBRvg4wFsBuS5KG8ELgJwi+clyZeadLABtG0ChunaPwD4nInvTGKRgKPL88lz+WJrv+u8ODeDa2oXLp9A6Aci+rlCuEPI1KQtmwv5cf2DmnDsLgfImEc5u+YZctTDl5cr0t8MAGQqApouI/Uogu1QpgY9Jec3XCAV/KTafBfhoRwZxZKmSP5wWRGoAW43niqV5zNfwfuPaQN4Q4L7AEUOASAUgVNj6Vb2mXt/A5BO/lHf9mdZr/fcLJ5tPGeKo/t9S7k3TsVIBKFYbP2ixZml8p0Z6QKxj8gpfx3gDcF4ahfH9IFTHUjl/v09kvQGUqo3fA4ET2NfbXaKUBCRmuFeIq4Nz4m9CfvRJjVKtcUq7lKXM+tSWFwBtgUb4qSXn4wio9EFjD628AvAO11kiyYxcJMxLcWB66uzDejn/SFIUvACUas23SRY2JHd3VG7qOYD5JGVbz7myjtztUfKKteYxIefqlZkrk2R6AmicsyKvO9YsVBsPtyT3pQqfQut03OiQpLzddYJUUZkuuiFJbv4Bw+uT0tULQLHWOL+B3DVtg08QsrSByZe3a7wDqPmuvw1szbGy1oIl3kuambwAqLB15B5Ug0mc11T67xjh4+/oOzoXqYOUnQV4UgEJeCfB3zICENaAcoAWMoxc5ohneLP7v+SCOskRpRU8Dcu/MgHQITByMfA+W2cgsjs740NJgeeFcxoFX1YemELdGT/sMDqraFiNyPFBxqv3DHFD2s6kBCaGh2Dlp1AfF2nk/UEjdyyAoBOwdYYiJ3s8MhsuLYNbpuOLYPCDPeq9K5Cr2joD0hTZHQAib7HAobhUigUQ9GJwPyFndVrsFBpbXyQZ1E94OoYI+eIggnMR1Tmo0yDI1dCB3F8vz+yJinosgLYXvnHFC3BFhZRqTSblfhRj94/OcTL0WxG5sRt1zgcpG8MJ8QBCQ49nBcAZXKw1P3LzfxSIOABxY8xFjcAUNl/1qZ+oCMQNd4k1AMh3Tmm9nBfXUgd2ob6hb+gaQLBjnwV5VdwcNrALKakA8tawXSiYUP/Bu0lF33VGOOA5nul2IXMwbnr14AF7hMDNwRqZggd0F3DAk4renffzAMAFK/L5UDzQq7RYbR4WwQudTtTu076G+d7rZWIlsbi06ZXnNczpBy73L8YsFLKwuSuzjUwFth+yTuvvkA/C1c/XuwPvkau6qtLKQX0rIs0Bn/VTZXpHoAdEpvtA8MRIcwDAmhH7pqV5xtf41ACcF7PayJzxarCT6fuc4mxJFYG4NBhmJ9YilQk8lLQyJqVoJgBUie+rRNAaPVbFJMMzjUC/srh3oZZc8n3aFEkCklkEkhSN6nwMYFSe9ZU7joCvp0Z1bxyBUXnWV+6Oj8C/t8DjUS6AbpYAAAAASUVORK5CYII="
                                    alt=""
                                    width="25"
                                />
                            </button>{" "}
                            <button>
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
