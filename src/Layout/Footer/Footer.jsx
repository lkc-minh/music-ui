import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { MdCall } from "react-icons/md";

import images from "~/assets/images";
import "./Footer.scss";

function Footer() {
    return (
        <footer className="Footer">
            <section className="Footer__top">
                <div className="Footer__top-left">
                    <a href="https://nctcorp.vn/" target="_blank" rel="noreferrer">
                        Company
                    </a>
                    <a
                        href="http://apps.nhaccuatui.com/nhaccuatui-for-desktop.html"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Product
                    </a>
                    <a href="https://www.nct.vn/ho-tro" target="_blank" rel="noreferrer">
                        Support
                    </a>
                    <a
                        href="https://beta.nhaccuatui.com/thoa-thuan-su-dung"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Terms
                    </a>
                </div>
                <div className="Footer__top-right">
                    <div className="Footer__top-right-social">
                        <a
                            href="https://www.facebook.com/NhacCuaTuiOfficial"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <AiFillFacebook className="icon" />
                        </a>
                        <a
                            href="https://www.instagram.com/Nhaccuatui/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i>
                                <AiOutlineInstagram className="icon" />
                            </i>
                        </a>
                    </div>
                    <div className="Footer__top-right-app">
                        <a
                            href="https://apps.apple.com/vn/app/nhaccuatui/id1210763463?ls=1"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={images.apple} alt="" />
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=ht.nct&hl=vi"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={images.android} alt="" />
                        </a>
                        <a
                            href="http://cdc.hispace.hicloud.com/000000fC"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={images.huawei} alt="" />
                        </a>
                    </div>
                </div>
            </section>

            <section className="Footer__center">
                <div className="Footer__center-head">
                    <div className="Footer__center-head-info">
                        <img src={images.logoBottom} alt="" />
                        <article>
                            <h4>NCT Corporation</h4>
                            <p className="tick">
                                Website Owner: <b>Mr. Nhan The Luan</b>
                            </p>
                        </article>
                    </div>

                    <div className="Footer__center-head-img">
                        <a
                            href="http://online.gov.vn/Home/WebDetails/44259"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={images.congThuong} alt="" />
                        </a>
                        <a
                            href="https://www.dmca.com/Protection/Status.aspx?ID=6aa0e355-51a6-4291-a835-45d4eb2d0ce1"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={images.DMCA} alt="" />
                        </a>
                    </div>
                </div>
                <div className="Footer__center-info">
                    <p className="tick">
                        Social Network License Number 499/GP-BTTTT issued by Ministry of
                        Information and Communications on Sep 28th, 2015.
                    </p>
                    <p className="tick">
                        Business Registration Certificate Number 0305535715 issued by
                        Department of Planning and Investment of HCMC on 01/03/2008.
                    </p>
                </div>
            </section>
            <section className="Footer__bottom">
                <a
                    href="https://www.google.com/maps/place/The+67+Building/@10.7296452,106.7230966,15z/data=!4m5!3m4!1s0x31752531e1adbc41:0xcb900908db687e6c!8m2!3d10.7311636!4d106.7243224"
                    target="_blank"
                    rel="noreferrer"
                >
                    <ImLocation className="icon-footer" />
                    The 678 Tower 67 Hoang Van Thai St, Ward Tan Phu, District 7, HCMC
                </a>
                <a href="tel:02838687979">
                    <MdCall className="icon-footer" />
                    (028) 3868 7979
                </a>
            </section>
        </footer>
    );
}

export default Footer;
