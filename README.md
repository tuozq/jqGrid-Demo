# jqGrid-Demo
记录jqGrid参数方法事件、基本用法
中文文档 https://blog.mn886.net/jqGrid/

grid-custom-extend.js 中扩展了一些常用的方法
```javascript
endEdit 	结束在编辑状态中的单元格
setLock		设置某个单元格锁定状态
appentFootRow 	添加合计行
customDateEditoptions 	日期输入控件配置，配合  {editable: true, edittype: 'custom',editoptions: $grid.customDateEditoptions} 使用
numberValidate  	验证输入值是否为数字，配合 {editrules: {custom:true, custom_func:$grid.numberValidate}}使用
```


## 表格colModel配置参数详解
### formatter 格式化单元格

对列进行格式化，如枚举列，列值实际为枚举值，需要转换为别名显示

```javascript
// 实际jqGrid内置了select下拉列表的格式化参数，可以直接配置 formatter: 'select'， 无需自定义formatter，unformat
// 此处为演示这两个参数的用法场景
var selectValOfSex = {1: '男', 2: '女'};

// select类型 格式化值为别名，表格显示值
function selectFormatter(cellvalue, options, rowObject){
	// 获取列配置的下拉选项值
	var value = options.colModel.editoptions.value;
	return value[cellvalue] || '';
}

{
	 name : 'sex',
	 index : 'name',
	 width : 100, 
	 editable : true,
	 edittype: 'select',
	 // 下拉框
	 editoptions:{value: selectValOfSex},
	 // formatter: 'select',
	 formatter: selectFormatter,
	 unformat: selectUnFormatter
 },
```
### unformat 反格式化单元格

对列进行反格式化，如枚举列，被formatter格式化之后，getRowData获取到的列值为别名，如需要获取枚举值，则需要通过unformat处理

```javascript
var selectValOfSex = {1: '男', 2: '女'};

// select类型 格式化别名为值，grid.jqGrid("getRowData")获取到的值
function selectUnFormatter(cellvalue, options, rowObject){
	// 获取列配置的下拉选项值
	var value = options.colModel.editoptions.value;
	for(var key in value){
		if(value[key] == cellvalue){
			return key;
		}
	}
	return '';
}
 ```


## 表格方法
### 合并表头
```javascript
// numberOfColumns 要合并的列数量
// startColumnName 合并的开始列
// titleText 合并列显示值
$grid.setGroupHeaders({
	useColSpanStyle: true,
	groupHeaders: [
		{"numberOfColumns": 3, "titleText": "个人信息", "startColumnName": "name"}
	]
});
```
