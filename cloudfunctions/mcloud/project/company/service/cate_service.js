/**
 * Notes: 分类管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-11-20 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const Cate1Model = require('../model/cate1_model.js');
const Cate2Model = require('../model/cate2_model.js');

class CateService extends BaseProjectService {

	async getAllCateOptions(status = 1) {
		let cate1List = await Cate1Model.getAll({ CATE1_STATUS: status }, '*', { 'CATE1_ORDER': 'asc', 'CATE1_ADD_TIME': 'desc' });

		let arr = [];
		for (let k in cate1List) {
			let cate1Id = cate1List[k]._id;

			let cate1Node = {
				level: 1,
				label: cate1List[k].CATE1_TITLE,
				val: cate1Id,
				order: cate1List[k].CATE1_ORDER,
				obj: cate1List[k].CATE1_OBJ,
				parentId: ''
			}
			let cate2List = await Cate2Model.getAll({ CATE2_CATE1_ID: cate1Id, CATE2_STATUS: status }, '*', { 'CATE2_ORDER': 'asc', 'CATE2_ADD_TIME': 'desc' });

			cate1Node.children = [];
			for (let j in cate2List) {
				let cate2Node = {
					level: 2,
					label: cate2List[j].CATE2_TITLE,
					val: cate2List[j]._id,
					order: cate2List[j].CATE2_ORDER,
					obj: cate2List[j].CATE2_OBJ,
					parentId: cate1Id
				}
				cate1Node.children.push(cate2Node);
			}

			arr.push(cate1Node);
		}

		return arr;
	}
}

module.exports = CateService;