import moduleAlias from 'module-alias';
moduleAlias.addAliases({
    "@": `${__dirname}`
});
import controllers from "./controllers";

const st: string[] = [];

controllers().then((controllers) => {
    Object.keys(controllers).forEach((key) => {
        st.push(key + `.create`);
        st.push(key + `.read`);
        st.push(key + `.update`);
        st.push(key + `.delete`);
    });
    console.log(st.sort());
});