/**
 * Notes: 资讯模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2020-09-29 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const ProductService = require('../service/product_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class ProductController extends BaseProjectController {


	/** 资讯列表 */
	async getProductList() { 

		// 数据校验
		let rules = {
			cateId: 'string',
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);
 
		let service = new ProductService();
		let result = await service.getProductList(input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].PRODUCT_ADD_TIME = timeUtil.timestamp2Time(list[k].PRODUCT_ADD_TIME, 'Y-M-D');
			list[k].PRODUCT_CATE_NAME = list[k].PRODUCT_CATE_NAME.join('-');
			if (list[k].PRODUCT_OBJ.content)
				delete list[k].PRODUCT_OBJ.content;
		}

		return result;

	}


	/** 浏览资讯信息 */
	async viewProduct() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ProductService();
		let product = await service.viewProduct(input.id);

		if (product) {
			// 显示转换 
			product.PRODUCT_ADD_TIME = timeUtil.timestamp2Time(product.PRODUCT_ADD_TIME, 'Y-M-D');
			product.PRODUCT_CATE_NAME = product.PRODUCT_CATE_NAME.join(' - ');
		}

		return product;
	}



}

module.exports = ProductController;