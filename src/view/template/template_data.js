import { TEMPLATE_LIST_URL, TEMPLATE_NAME_URL, TEMPLATE_TAGS_URL } from '../../api/url';

export default {
    fetchUrl: TEMPLATE_LIST_URL,
    name: '模板管理',
    searchList: [
        {
            fieldType: 'RcSelect',
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
            cols: 6
        },
        {
            fieldType: 'RcSelect',
            name: 'name',
            label: '模板名称',
            options: TEMPLATE_NAME_URL,
            cols: 6
        },
        {
            fieldType: 'RcSelect',
            name: 'tags',
            label: '模板标签',
            cols: 6,
            options: TEMPLATE_TAGS_URL,
        }
    ],
    columns: [
        {
            label: '模板名称',
            prop: 'name',
            width: 200
        },
        {
            label: '模板类型',
            prop: 'type',
            render: (record, _, text) => {
                let str = text === 'clue' ? '汽车' : '教育';
                return str
            },
            width: 100
        },
        {
            label: '模板标签',
            prop: 'tags',
            render: (record, _, text) => {
                let str = text && Array.isArray(text) ? text.join(',') : text;
                return str
            },
        },
        {
            label: '操作',
            prop: 'action',
            action: true
        }
    ]
};
