import Onion, { Component } from "../../modules/onion/index.js";
import LocalizationManager from "../../modules/localization/index.js";

export default class LanguageProvider extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            isLoading: true,
            language: 'en',
        };
        this.setLanguage = this.setLanguage.bind(this);
        this.localizeText = this.localizeText.bind(this);
    }

    async onMount()
    {
        // console.log("onMount");
        const user = JSON.parse(localStorage.getItem('user'));
        let language = user?.language_preference || this.state.language;
        language = language.toLowerCase();
        await LocalizationManager.setLanguage(language);
        this.setState({ isLoading: false });
    }

    shouldComponentUpdate(newProps, newState)
    {
        // console.log("shouldComponentUpdate");
        // const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user);
        // console.log(newState);
        // console.log(this.state);
        // if (newState && ((newState.language && newState.language !== this.state.language) || newState.isLoading))
        //     return true;
        // if ((!user || this.state.language === user.language_preference))
        //     return true;

        // this.setLanguage(user.language_preference);
        return true;
    }

    setLanguage = async (lang) => {
        lang = lang.toLowerCase();        
        this.setState({ isLoading: true });
        await LocalizationManager.setLanguage(lang);
        this.setState({ language: lang, isLoading: false });
    };

    localizeText(key)
    {
        return LocalizationManager.getString(key);
    };

    render()
    {
        this.context.language = this.state.language;
        this.context.setLanguage = this.setLanguage;
        this.context.localizeText = this.localizeText;

        if (this.state.isLoading)
        {
            return String.raw`<span style="margin:2.5px;" class="d-flex spinner-border spinner-border-medium" role="status" aria-hidden="true"></span>`;
        }
        return String.raw`${Onion.Children.combine(this.props.children)}`;
    }
}