import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "@/router";
import i18n from "@/i18n";
import { store } from "@/store";

const app = createApp(App);

app.use(router);
app.use(store);

i18n.setup();
app.use(i18n.vueI18n);

app.mount("#app");
