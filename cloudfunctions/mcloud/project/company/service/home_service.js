/**
 * Notes: 全局/首页模块业务逻辑
 * Date: 2021-03-15 04:00:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */

const BaseProjectService = require('./base_project_service.js');
const setupUtil = require('../../../framework/utils/setup/setup_util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const NewsModel = require('../model/news_model.js');
const ProductModel = require('../model/product_model.js');
const CateService = require('../service/cate_service.js');

class HomeService extends BaseProjectService {

	async getSetup(key) {
		return await setupUtil.get(key);
	}

	/**首页列表 */
	async getHomeList() {


		let where = {
			NEWS_STATUS: 1,
			NEWS_CATE_ID: '1',
		};
		let orderBy = {
			'NEWS_VOUCH': 'desc',
			'NEWS_ORDER': 'asc',
			'NEWS_ADD_TIME': 'desc'
		}
		let fields = 'NEWS_TITLE,NEWS_CATE_NAME,NEWS_PIC,NEWS_DESC,NEWS_ADD_TIME';
		let newsList = await NewsModel.getAll(where, fields, orderBy, 10);
		for (let k = 0; k < newsList.length; k++) {
			newsList[k].NEWS_ADD_TIME = timeUtil.timestamp2Time(newsList[k].NEWS_ADD_TIME);
		}

		where = {
			PRODUCT_STATUS: 1,
		};
		orderBy = {
			'PRODUCT_VOUCH': 'desc',
			'PRODUCT_ORDER': 'asc',
			'PRODUCT_ADD_TIME': 'desc'
		}
		fields = 'PRODUCT_TITLE,PRODUCT_CATE_NAME,PRODUCT_OBJ.cover';
		let productList = await ProductModel.getAll(where, fields, orderBy, 10);
		for (let k = 0; k < productList.length; k++) {
		}

		let cateService = new CateService();
		let cateList = await cateService.getAllCateOptions();

		return { newsList, productList, cateList }

	}
}

module.exports = HomeService;