<template>
    <div>
        <RcTable
            :tableConfig="tableConfig"
            :searchForm="searchForm"
            :formatSelectList="formatSelectList"
            :buttonList="buttonList"
            v-if="type === 'table'"
        />

        <TemplateCars
            v-else-if="type === 'clue'"
            @handleBackTable="handleBackTable"
            :templateType="templateType"
            :temData="temData"
        />

        <TemplateEdu
            v-else-if="type === 'edu'"
            :templateType="templateType"
            :temData="temData"
            @handleBackTable="handleBackTable"
        />

        <ActivityCreate
            :activityType="templateType"
            v-else-if="type === 'activity_cars'"
            @handleBackTable="handleBackTable"
            :temData="temData"
        />

        <ActivityCreateEdu
            :activityType="templateType"
            v-else-if="type === 'activity_edu'"
            @handleBackTable="handleBackTable"
            :temData="temData"
        />

        <Dialog
            :status="dialogVisible"
            title="新增模板"
            @handleCancel="handleCancel"
            @handleOk="handleOk"
            :dialogList="dialogList"
            v-model="dialogData"
        />
    </div>
</template>

<script>
import RcTable from '../../components/table';
import templateData from './template_data';
import Dialog from '../../components/dialog/index';
import TemplateCars from '../template_create/cars';
import TemplateEdu from '../template_create/edu';
import ActivityCreate from '../activity_create/activityCreateCars/index';
import ActivityCreateEdu from '../activity_create/activityCreateEdu/index';
const templateConfig = require('./template');
const templateEduConfig = require('./template_edu');
import { carsFillImgUrl, eduFillImgUrl } from './defaultInfo';
import { isArray } from '@/utils/tools';
import _ from 'lodash';
    export default {
        name: 'Template',
        components: {
            RcTable, Dialog, TemplateCars, TemplateEdu, ActivityCreate, ActivityCreateEdu
        },
        data() {
            return {
                tableConfig: templateData, // 表格配置
                formatSelectList: { // 处理 select 框数据
                    tags: (list) => list.map(v => ({ id: v.name, name: v.name })),
                    name: (list) => list.map(v => ({ id: v.name, name: v.name })),
                },
                dialogList: [ // 模态框渲染配置
                    {
                        fieldType: 'RcRadio',
                        name: 'type',
                        label: '模板类型',
                        options: [
                            {
                                id: 'clue',
                                name: '汽车'
                            },
                            {
                                id: 'edu',
                                name: '教育'
                            }
                        ],
                        cols: 24
                    }
                ],
                dialogData: { // 模态框表单赋值
                    type: 'clue'
                },
                searchForm: { // 搜索项表单赋值
                    type: '',
                    name: '',
                    tags: ''
                },
                buttonList: [ // 按钮、操作列表
                    { className: 'add-btn', text: '新增模板', icon: '', click: this.handleAddTemplate }
                ],
                dialogVisible: false,
                type: 'table',
                templateType: 'add',
                temData: {},
            }
        },
        beforeMount() {
            let columns = templateData.columns;
            columns[columns.length-1].render = (record, _, text) => {
                return (
                    <div class="table-acions-item">
                        <span onClick={() => this.handleEdit(record, 'edit')}>编辑</span>
                        <span onClick={() => this.handleEdit(record, 'add')}>复制</span>
                        <span onClick={() => this.handleEdit(record, 'view')}>查看</span>
                        <span onClick={() => this.handleAddActivity(record)}>创建活动</span>
                    </div>
                )
            }
            this.tableConfig = templateData;
        },
        methods: {
            // 创建活动
            handleAddActivity(row) {
                this.type = row.type === 'clue' ? 'activity_cars' : 'activity_edu'
                this.templateType = 'add';
                this.temData = row;
            },
            // 编辑、复制、查看
            handleEdit(row, type) {
                this.templateType = type;
                this.type = row.type;
                this.handleTemplateConfig(row, row.type);
            },
            // 打开选择模板模态框
            handleAddTemplate() {
                this.dialogVisible = true;
            },
            // 选择模板取消按钮
            handleCancel() {
                this.dialogVisible = false;
                this.dialogData.type = 'clue';
            },
            // 选择模板确认按钮
            handleOk() {
                const type = this.dialogData.type;
                const templateInfo = type === 'clue' ? _.cloneDeep(templateConfig) : _.cloneDeep(templateEduConfig);
                this.type = type;
                this.handleTemplateConfig(templateInfo, type);
                this.handleCancel();
            },
            // 返回列表页
            handleBackTable() {
                this.type = 'table';
                this.temData = {}
            },
            // 处理模板数据
            handleTemplateConfig(templateInfo, type) {
                const fillImage = type === 'clue' ? _.cloneDeep(carsFillImgUrl) : _.cloneDeep(eduFillImgUrl);
                let configs = _.cloneDeep(templateInfo.configs);

                configs = fillImage && fillImage.reduce((acc, v) => {
                    if (configs[v] && typeof configs[v] === 'string') {
                        let arr = configs[v].split('/');
                        acc[v] = [{
                            uid: -1,
                            url: `http://static.yunheit.com/${configs[v]}`,
                            status: 'success',
                            name: arr[arr.length - 1],
                            path: configs[v]
                        }]
                    } else if (configs[v] && isArray(configs[v]) && configs[v].length) {
                        let fileList = [];
                        configs[v].map((file, index) => {
                            let nameArr = file.split('/');
                            fileList.push({
                                uid: index,
                                url: `http://static.yunheit.com/${file}`,
                                status: 'success',
                                name: nameArr[nameArr.length - 1],
                                path: file
                            })
                        });

                        acc[v] = fileList;
                    } else {
                        acc[v] = []
                    }

                    return { ...configs, ...acc };
                }, {})

                configs.template_name = (configs.template_name ? configs.template_name : templateInfo.name) || '';
                configs.template_tags = (configs.template_tags ? configs.template_tags : templateInfo.tags) || [];
                configs.background = configs.background_url ? 'background_url' : 'background_color';
                configs.ex_brand_txt = configs.ex_brand_txt && configs.ex_brand_txt.length ? configs.ex_brand_txt.map(v => ({ id: v.key, name: v.label })) : [];

                templateInfo.configs = configs;
                this.temData = templateInfo;
            }
        },
    }
</script>

<style scoped>

</style>
