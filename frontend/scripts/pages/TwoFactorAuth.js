import { Component } from "../../modules/onion/index.js";
import BaseButton from "../components/BaseButton.js";
import CloseButton from "../components/CloseButton.js";

export default class TwoFactorAuth extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            isLoading: false,
        };
    }

    onMount()
    {
        this.handleButtonSendAgain();
    }

    async handleButtonConfirm() 
    {
        this.setState({isLoading: true});

        const { token, user } = this.props;

        const username = user.username;
        const otp_code = document.getElementById("otp_code").value;
        try
        {
            const response = await fetch('http://0.0.0.0:8000/preferences/verify-otp/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.access_token}`
                },
                body: JSON.stringify({
                    username: username,
                    otp: otp_code,
                })
            });
        
            if (response.ok)
            {
                localStorage.setItem('token', JSON.stringify(token));
                this.context.navigate('/main-menu');
            }
            else
            {
                alert('OTP is incorrect!');
                this.setState({isLoading: false});
            }
        }
        catch (error)
        {
            console.error(error.message || error);
            this.context.navigate('/login');
        }
    }
    
    async handleButtonSendAgain() 
    {
        this.setState({isLoading: true});

        const { token } = this.props;
        try
        {
            const response = await fetch('http://0.0.0.0:8000/preferences/send-otp/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token.access_token}`
                }
            });
        
            if (response.ok)
            {
                alert(`OTP has been sent to your intra email. If you don't see it in your inbox, please check your spam or junk folder.`);
            }
            else
            {
                console.error('Failed to send-otp:', response.status, response.statusText);
                alert('An error occurred. Please try sending again.');
            }
            this.setState({isLoading: false});
        }
        catch (error)
        {
            console.error(error.message || error);
            this.context.navigate('/login');
        }
    }

    handleCloseButtonClick()
    {
        this.context.navigate("/login");
    }

    render()
    {
        const { token } = this.props;
        if (!token)
        {
            return String.raw`
                <div className="${Redirect.name}" to="/"></div>
            `;
        }
        return String.raw`
            <link rel="stylesheet" href="/styles/TwoFactorAuth.css">
            <div class="window">
                <div class="window-header">
                    <div className="${CloseButton.name}" onClick="${this.handleCloseButtonClick.name}"></div>
                </div>        
                <div class="window-content">
                    <h2>${this.context.localizeText('ENTER_OTP')}</h2>
                    <input type="text" class="code-input" placeholder="******" maxlength="6" id="otp_code">
                    <div className="${BaseButton.name}" text="${this.context.localizeText('SEND_AGAIN')}" onClick="${this.handleButtonSendAgain.name}" isDisabled="${this.state.isLoading}" isLoading="${this.state.isLoading}"></div>
                    <div buttonStylePath="/styles/PlayButton.css" buttonClass="play-button" className="${BaseButton.name}" text="${this.context.localizeText('CONFIRM')}" onClick="${this.handleButtonConfirm.name}" isDisabled="${this.state.isLoading}"></div>
                </div>
            </div>
        `;
    }
}