module.exports = { //company
	PROJECT_COLOR: '#336DFF',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#336DFF',


	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [ 
		{ mark: 'trade', title: '行业领域', type: 'text', must: true },
		{ mark: 'city', title: '所在地区', type: 'text', must: false },
	],
	USER_CHECK_FORM: {
		name: 'formName|must|string|min:1|max:30|name=昵称',
		mobile: 'formMobile|must|mobile|name=手机', 
		forms: 'formForms|array'
	},


	PRODUCT_NAME: '产品',
	PRODUCT_CATE: [
		{ id: 1, title: '产品', style: 'leftbig1' },

	],
	PRODUCT_FIELDS: [ 
		{ mark: 'content', title: '详细内容', type: 'content', must: true },
		{ mark: 'cover', title: '封面图', type: 'image', min: 1, max: 1, must: true }, 
	],

	CATE_NAME: '分类',
	CATE1_FIELDS: [  // 一级分类
		{ mark: 'cover', title: '封面图', type: 'image', min: 1, max: 1, must: true },
		{ mark: 'haslevel', title: '是否有二级分类', type: 'switch', must: true },
	],

	CATE2_FIELDS: [ // 二级分类
		{ mark: 'cover', title: '封面图', type: 'image', min: 1, max: 1, must: true },
		{ mark: 'desc', title: '简介', type: 'textarea' },
	], 
	 

	INFO_NAME: '合作意向',
	INFO_CATE: [
		{ id: 1, title: '业务往来', style: 'leftbig1' }, 
		{ id: 2, title: '洽谈合作', style: 'leftbig1' }, 
		{ id: 3, title: '产品咨询', style: 'leftbig1' },   
		{ id: 4, title: '销售采购', style: 'leftbig1' },   
	],
	INFO_FIELDS: [
		{ mark: 'company', title: '单位公司', type: 'text', must: true },
		{ mark: 'name', title: '姓名', type: 'text', must: true },
		{ mark: 'phone', title: '电话', type: 'text', must: true },
		{ mark: 'desc', title: '其他说明', type: 'textarea', must: false },
	],

	NEWS_NAME: '资讯',
	NEWS_CATE: [
		{ id: 1, title: '企业概况' },
		{ id: 2, title: '公告通知' },
		{ id: 3, title: '公司动态' },
		{ id: 4, title: '业务动态' }, 
		{ id: 5, title: '企业文化' },

	],
	NEWS_FIELDS: [
	],


}