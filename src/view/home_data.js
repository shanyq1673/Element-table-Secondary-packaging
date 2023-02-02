
export default {
    fetchUrl: '', // 列表请求接口、获取列表和搜索时使用
    name: '角色管理',
    searchList: [
        {
            fieldType: 'RcSelect',
            name: 'type',
            label: '用户类型',
            options: [
                {
                    id: 0,
                    name: '运营'
                },
                {
                    id: 1,
                    name: '产品'
                }
            ],
            cols: 6
        },
        {
            fieldType: 'RcSelect',
            name: 'name',
            label: '用户名称',
            cols: 6,
            labelInValue: true,
            options: [
                {
                    id: 0,
                    name: '赵云'
                },
                {
                    id: 1,
                    name: '李白'
                },
                {
                    id: 2,
                    name: '刘备'
                },
                {
                    id: 3,
                    name: '关羽'
                },
                {
                    id: 4,
                    name: '张飞'
                }
            ]
        },
        {
            fieldType: 'RcSelect',
            name: 'sex',
            label: '用户性别',
            cols: 6
        }
    ],
    columns: [
        {
            label: '用户名称',
            prop: 'name',
            width: 200
        },
        {
            label: '用户类型',
            prop: 'type',
            render: (record, _, text) => {
                let str = text === 0 ? '运营' : '产品';
                return str
            },
            width: 100
        },
        {
            label: '操作',
            prop: 'action',
            action: true
        }
    ]
};
