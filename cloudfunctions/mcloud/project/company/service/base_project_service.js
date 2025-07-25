﻿/**
 * Notes: 业务基类 
 * Date: 2025-03-15 04:00:00 
 */

const dbUtil = require('../../../framework/database/db_util.js');
const util = require('../../../framework/utils/util.js');
const AdminModel = require('../../../framework/platform/model/admin_model.js');
const ProductModel = require('../model/product_model.js');
const Cate1Model = require('../model/cate1_model.js');
const NewsModel = require('../model/news_model.js');
const BaseService = require('../../../framework/platform/service/base_service.js');

class BaseProjectService extends BaseService {
	getProjectId() {
		return util.getProjectId();
	}

	async initSetup() {

		let F = (c) => 'bx_' + c;
		const INSTALL_CL = 'setup_company';
		const COLLECTIONS = ['setup', 'admin', 'log', 'news', 'cate1', 'cate2', 'fav', 'user', 'product', 'info'];
		const CONST_PIC = '/images/cover.gif';


		const PRODUCT_CATE1 = '1=分类1,2=分类2,3=分类3'; 
		const NEWS_CATE = '1=企业概况,2=公告通知,3=公司动态,4=业务动态,5=企业文化';

		if (await dbUtil.isExistCollection(F(INSTALL_CL))) {
			return;
		}

		console.log('### initSetup...');

		let arr = COLLECTIONS;
		for (let k = 0; k < arr.length; k++) {
			if (!await dbUtil.isExistCollection(F(arr[k]))) {
				await dbUtil.createCollection(F(arr[k]));
			}
		}

		if (await dbUtil.isExistCollection(F('admin'))) {
			let adminCnt = await AdminModel.count({});
			if (adminCnt == 0) {
				let data = {};
				data.ADMIN_NAME = 'admin';
				data.ADMIN_PASSWORD = 'e10adc3949ba59abbe56e057f20f883e';
				data.ADMIN_DESC = '超管';
				data.ADMIN_TYPE = 1;
				await AdminModel.insert(data);
			}
		}

		if (await dbUtil.isExistCollection(F('news'))) {
			let newsCnt = await NewsModel.count({});
			if (newsCnt == 0) {
				let newsArr = NEWS_CATE.split(',');
				for (let j in newsArr) {
					let title = newsArr[j].split('=')[1];
					let cateId = newsArr[j].split('=')[0];

					let data = {};
					data.NEWS_TITLE = title + '标题1';
					data.NEWS_DESC = title + '简介1';
					data.NEWS_CATE_ID = cateId;
					data.NEWS_CATE_NAME = title;
					data.NEWS_CONTENT = [{ type: 'text', val: title + '内容1' }];
					data.NEWS_PIC = [CONST_PIC];

					await NewsModel.insert(data);
				}
			}
		}


		if (await dbUtil.isExistCollection(F('cate1'))) {
			let cate1Cnt = await Cate1Model.count({});
			if (cate1Cnt == 0) {
				let cate1Arr = PRODUCT_CATE1.split(',');
				for (let j in cate1Arr) {
					let title = cate1Arr[j].split('=')[1];
					let cateId = cate1Arr[j].split('=')[0];

					let data = {};
					data._id = cateId;
					data.CATE1_TITLE = title;
					data.CATE1_OBJ = {
						cover: [CONST_PIC]
					}

					await Cate1Model.insert(data);
				}
			}
		}


		if (await dbUtil.isExistCollection(F('product'))) {
			let productCnt = await ProductModel.count({});
			if (productCnt == 0) {
				let productArr = PRODUCT_CATE1.split(',');
				for (let j in productArr) {
					let title = productArr[j].split('=')[1];
					let cateId = productArr[j].split('=')[0];

					let data = {};
					data.PRODUCT_TITLE = title + '文章标题1';
					data.PRODUCT_CATE_ID = [cateId];
					data.PRODUCT_CATE_NAME = title;
					data.PRODUCT_OBJ = {
						cover: [CONST_PIC]
					}

					await ProductModel.insert(data);
				}
			}
		}



		if (!await dbUtil.isExistCollection(F(INSTALL_CL))) {
			await dbUtil.createCollection(F(INSTALL_CL));
		}
	}

}

module.exports = BaseProjectService;