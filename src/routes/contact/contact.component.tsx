import { FC } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3-safe";
import ContactForm from "../../components/contact-form/contact-form.component";
import { useSelector } from "react-redux";
import { selectTheme } from "../../store/preferences/preferences.selector";



const Contact: FC = () => {
    const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY!;
    const theme = useSelector(selectTheme);

    return (
        <div className="">
            <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}
                useEnterprise
                container={{
                    parameters: {
                      badge: 'bottomright', // optional, default undefined
                      theme: theme, // optional, default undefined
                    }
                }}
            >
                <ContactForm />
            </GoogleReCaptchaProvider>
        </div>
    );
}

export default Contact;