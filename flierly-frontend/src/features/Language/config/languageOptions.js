const languages = [
    { name: 'English', country: "US", code: "en_us" },
    { name: 'Telugu', country: "IN", code: "te_in" }
];

const languageOptions = () => {
    return languages.map((language) => {
        return {
            value: language.code,
            label: `${language.country} ${language.name}`
        };
    });
};

export default languageOptions;