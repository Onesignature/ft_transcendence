import { Component } from "../../modules/onion/index.js";
import LocalizationManager from "../../modules/localization/index.js";

export default class LanguageProvider extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            language: 'en',
            loading: true,
        };
        this.setLanguage = this.setLanguage.bind(this);
        this.localizeText = this.localizeText.bind(this);
    }

    async onMount()
    {
        await LocalizationManager.setLanguage('en');
        this.setState({ loading: false });
    }

    setLanguage = async (lang) => {
        this.setState({ loading: true });
        await LocalizationManager.setLanguage(lang);
        this.setState({ language: lang, loading: false });
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

        if (this.state.loading)
        {
            return String.raw`<span style="margin:2.5px;" class="d-flex spinner-border spinner-border-medium" role="status" aria-hidden="true"></span>`;
        }
        return String.raw`${this.props.children}`;
    }
}