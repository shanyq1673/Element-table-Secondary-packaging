import {
    Select, Option, Input, Radio, Message, Tabs, TabPane, Form, FormItem, Col, Switch, Checkbox, CheckboxGroup,
    Button, RadioGroup, Row, Upload, MessageBox, Dialog, Table, TableColumn, Pagination, Loading, DatePicker,
    Popover
} from 'element-ui';
import Vue from 'vue';

Vue.config.productionTip = false;
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(Switch);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(RadioGroup);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Table);
Vue.use(Pagination);
Vue.use(TableColumn);
Vue.use(Loading);
Vue.use(Popover);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm
